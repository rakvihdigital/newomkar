import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/window-display/giva.jpg",
    "alt": "GIVA jewellery window display with illuminated festive decorations",
    "caption": "GIVA"
  },
  {
    "src": "/assets/window-display/fashion.jpg",
    "alt": "Fashion window display with seated mannequins and graphic props",
    "caption": "FASHION DISPLAY"
  },
  {
    "src": "/assets/window-display/autumn.jpg",
    "alt": "Autumn themed window display with a bicycle and decorative leaves",
    "caption": "TRENDS \u2014 AUTUMN DISPLAY"
  },
  {
    "src": "/assets/window-display/denim.jpg",
    "alt": "Denim window display with mannequins and plants",
    "caption": "DENIM DISPLAY"
  }
];

export default function WindowDisplaySection() {
  return (
    <MotionGallery
      id="window-display"
      title="Window Display"
      description="Creative window displays that turn passing glances into lasting impressions."
      images={images}
    />
  );
}
