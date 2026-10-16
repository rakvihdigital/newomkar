import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/arch-gate/tata-festival-of-diamonds-arch.webp",
    "alt": "Tata Festival of Diamonds Arch",
    "caption": "TATA FESTIVAL OF DIAMONDS ARCH"
  },
  {
    "src": "/assets/portfolio/arch-gate/giva-diwali-entrance-arch.webp",
    "alt": "GIVA Diwali Entrance Arch",
    "caption": "GIVA DIWALI ENTRANCE ARCH"
  },
  {
    "src": "/assets/portfolio/arch-gate/mia-by-tanishq-lightscape-arch.webp",
    "alt": "Mia by Tanishq Lightscape Arch",
    "caption": "MIA BY TANISHQ LIGHTSCAPE ARCH"
  },
  {
    "src": "/assets/portfolio/arch-gate/blackberrys-illuminated-entrance.webp",
    "alt": "Blackberrys Illuminated Entrance",
    "caption": "BLACKBERRYS ILLUMINATED ENTRANCE"
  },
  {
    "src": "/assets/portfolio/arch-gate/zimson-entrance-arches.webp",
    "alt": "Zimson Entrance Arches",
    "caption": "ZIMSON ENTRANCE ARCHES"
  },
  {
    "src": "/assets/portfolio/visual/xiaomi-home-mall-storefront.webp",
    "alt": "Xiaomi Home Mall Entrance",
    "caption": "XIAOMI HOME MALL ENTRANCE"
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
