import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/arch-gate/blackberrys.jpg",
    "alt": "Gold decorative entrance gate outside a Blackberrys storefront",
    "caption": "BLACKBERRYS"
  },
  {
    "src": "/assets/arch-gate/giva.jpg",
    "alt": "Illuminated pink GIVA Diwali entrance arch",
    "caption": "GIVA \u2014 DIWALI"
  },
  {
    "src": "/assets/arch-gate/festival-of-diamonds.jpg",
    "alt": "Blue Festival of Diamonds entrance arch with illuminated edges",
    "caption": "FESTIVAL OF DIAMONDS"
  },
  {
    "src": "/assets/arch-gate/mia.jpg",
    "alt": "Pink Mia by Tanishq promotional entrance gate",
    "caption": "MIA BY TANISHQ"
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
