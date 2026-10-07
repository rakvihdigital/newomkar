import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/visual/illuminated-displays.jpg",
    "alt": "Illuminated Karmiq and EasyBuy promotional visual displays",
    "caption": "KARMIQ & EASYBUY"
  },
  {
    "src": "/assets/visual/new-arrivals.jpg",
    "alt": "Jewellery display with a New Arrivals visual and pastel decorations",
    "caption": "NEW ARRIVALS"
  },
  {
    "src": "/assets/visual/green-jewellery.jpg",
    "alt": "Green jewellery visual display with layered heart decorations",
    "caption": "GREEN JEWELLERY DISPLAY"
  }
];

export default function VisualSection() {
  return (
    <MotionGallery
      id="visual"
      title="Visual"
      description="Compelling retail visuals that tell your brand story."
      images={images}
    />
  );
}
