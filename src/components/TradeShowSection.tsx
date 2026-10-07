import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/trade-show/luxe.jpg",
    "alt": "Luxe trade show display with illuminated circular decorations and a mannequin",
    "caption": "LUXE"
  },
  {
    "src": "/assets/trade-show/lee.jpg",
    "alt": "Lee trade show display with yellow branded arches and mannequins",
    "caption": "LEE"
  }
];

export default function TradeShowSection() {
  return (
    <MotionGallery
      id="trade-show"
      title="Trade Show"
      description="Exhibition displays that put your brand at the centre of attention."
      images={images}
    />
  );
}
