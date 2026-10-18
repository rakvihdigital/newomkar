import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/visual/sobha-windsor-lobby-mural-lightbox.webp",
    "alt": "Sobha Windsor Lobby Mural Lightbox",
    "caption": "SOBHA WINDSOR LOBBY MURAL LIGHTBOX"
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
    "src": "/assets/portfolio/visual/mediterranean-villa-mural-lightbox.webp",
    "alt": "Mediterranean Villa Mural Lightbox",
    "caption": "MEDITERRANEAN VILLA MURAL LIGHTBOX"
  },
  {
    "src": "/assets/portfolio/visual/moonlit-grand-residence-display.webp",
    "alt": "Moonlit Grand Residence Display",
    "caption": "MOONLIT GRAND RESIDENCE DISPLAY"
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
