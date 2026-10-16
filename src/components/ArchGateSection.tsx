import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/arch-gate/giva-world-diwali-entrance-display.webp",
    "alt": "GIVA World Diwali Entrance Display",
    "caption": "GIVA WORLD DIWALI ENTRANCE DISPLAY"
  },
  {
    "src": "/assets/portfolio/arch-gate/bata-storefront-promotional-facade.webp",
    "alt": "Bata Storefront Promotional Facade",
    "caption": "BATA STOREFRONT PROMOTIONAL FACADE"
  },
  {
    "src": "/assets/portfolio/arch-gate/festival-of-diamonds-storefront-at-dusk.webp",
    "alt": "Festival of Diamonds Storefront at Dusk",
    "caption": "FESTIVAL OF DIAMONDS STOREFRONT AT DUSK"
  },
  {
    "src": "/assets/portfolio/arch-gate/illuminated-blackberrys-storefront-at-night.webp",
    "alt": "Illuminated BlackBerrys Storefront at Night",
    "caption": "ILLUMINATED BLACKBERRYS STOREFRONT AT NIGHT"
  },
  {
    "src": "/assets/portfolio/arch-gate/mia-by-tanishq-pink-nighttime-entrance.webp",
    "alt": "Mia by Tanishq Pink Nighttime Entrance",
    "caption": "MIA BY TANISHQ PINK NIGHTTIME ENTRANCE"
  },
  {
    "src": "/assets/portfolio/arch-gate/nexus-vijaya-fashion-storefront.webp",
    "alt": "Nexus Vijaya Fashion Storefront",
    "caption": "NEXUS VIJAYA FASHION STOREFRONT"
  }
];

export default function ArchGateSection() {
  return (
    <MotionGallery
      variant="arch"
      id="arch-gate"
      title="Arch Gate"
      description="Welcoming entrances designed to make every arrival memorable."
      images={images}
      dark
    />
  );
}
