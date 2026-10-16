import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/visual/united-colors-of-benetton-visual.webp",
    "alt": "United Colors of Benetton Visual",
    "caption": "UNITED COLORS OF BENETTON VISUAL"
  },
  {
    "src": "/assets/portfolio/visual/westside-hospital-facade.webp",
    "alt": "Westside Hospital Facade",
    "caption": "WESTSIDE HOSPITAL FACADE"
  },
  {
    "src": "/assets/portfolio/visual/tuborg-party-mural.webp",
    "alt": "Tuborg Party Mural",
    "caption": "TUBORG PARTY MURAL"
  },
  {
    "src": "/assets/portfolio/visual/neoclassical-gateway-visuals.webp",
    "alt": "Neoclassical Gateway Visuals",
    "caption": "NEOCLASSICAL GATEWAY VISUALS"
  },
  {
    "src": "/assets/portfolio/visual/xiaomi-home-mall-storefront.webp",
    "alt": "Xiaomi Home Mall Storefront",
    "caption": "XIAOMI HOME MALL STOREFRONT"
  },
  {
    "src": "/assets/portfolio/visual/samsung-storefront.webp",
    "alt": "Samsung Storefront",
    "caption": "SAMSUNG STOREFRONT"
  }
];

export default function VisualSection() {
  return (
    <MotionGallery
      variant="wipe"
      id="visual"
      title="Visual"
      description="Compelling retail visuals that tell your brand story."
      images={images}
    />
  );
}
