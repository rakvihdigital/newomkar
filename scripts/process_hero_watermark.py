"""Feathered, localized watermark treatment for the hero clips."""

from pathlib import Path
import subprocess
import sys

import cv2
import numpy as np


def treat(frame: np.ndarray) -> np.ndarray:
    height, width = frame.shape[:2]
    if (width, height) == (1280, 720):
        x, y, patch_w, patch_h = 1118, 545, 92, 102
        blur_bounds = (12, 11, 79, 90)
        repair_bounds = (15, 14, 76, 87)
    elif (width, height) == (1920, 1080):
        x, y, patch_w, patch_h = 1688, 847, 102, 102
        blur_bounds = (10, 10, 94, 95)
        repair_bounds = (15, 15, 89, 90)
    else:
        raise ValueError(f"Unexpected source size: {width}x{height}")

    patch = frame[y:y + patch_h, x:x + patch_w]
    repair_mask = np.zeros((patch_h, patch_w), dtype=np.uint8)
    cv2.rectangle(repair_mask, repair_bounds[:2], repair_bounds[2:], 255, -1)
    mask = np.zeros((patch_h, patch_w), dtype=np.float32)
    cv2.rectangle(mask, blur_bounds[:2], blur_bounds[2:], 1, -1)
    mask = cv2.GaussianBlur(mask, (0, 0), 5)[:, :, None]
    repaired = cv2.inpaint(patch, repair_mask, 3, cv2.INPAINT_TELEA)
    blurred = cv2.GaussianBlur(repaired, (0, 0), 8)
    frame[y:y + patch_h, x:x + patch_w] = (
        patch * (1 - mask) + blurred * mask
    ).astype(np.uint8)
    return frame


def process(source: Path, target: Path, desktop: bool) -> None:
    capture = cv2.VideoCapture(str(source))
    width = int(capture.get(cv2.CAP_PROP_FRAME_WIDTH))
    height = int(capture.get(cv2.CAP_PROP_FRAME_HEIGHT))
    if (width, height) not in ((1280, 720), (1920, 1080)):
        raise ValueError(f"Unexpected video size: {width}x{height}")

    output_size = (2560, 1440) if desktop and width == 1280 else (width, height)
    command = [
        "ffmpeg", "-loglevel", "error", "-y", "-f", "rawvideo", "-pix_fmt", "bgr24",
        "-s", f"{output_size[0]}x{output_size[1]}", "-r", "24", "-i", "-",
        "-an", "-c:v", "libx264", "-preset", "slow", "-crf", "19" if desktop else "20",
        "-g", "1", "-keyint_min", "1", "-sc_threshold", "0", "-pix_fmt", "yuv420p",
        "-movflags", "+faststart", str(target),
    ]
    encoder = subprocess.Popen(command, stdin=subprocess.PIPE)
    try:
        while True:
            ok, frame = capture.read()
            if not ok:
                break
            frame = treat(frame)
            if desktop and width == 1280:
                frame = cv2.resize(frame, output_size, interpolation=cv2.INTER_LANCZOS4)
                # Small amount of sharpening to counter the soft 720p source.
                soft = cv2.GaussianBlur(frame, (0, 0), 1.1)
                frame = cv2.addWeighted(frame, 1.30, soft, -0.30, 0)
            encoder.stdin.write(frame.tobytes())
    finally:
        capture.release()
        encoder.stdin.close()
    if encoder.wait() != 0:
        raise RuntimeError(f"Could not encode {target}")


if __name__ == "__main__":
    input_path = Path(sys.argv[1])
    output_path = Path(sys.argv[2])
    process(input_path, output_path, sys.argv[3] == "desktop")
