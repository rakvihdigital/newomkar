import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/channel-letters/illuminated-sobha-verdure-entrance-at-dusk.png",
    "alt": "Illuminated Sobha Verdure Entrance at Dusk",
    "caption": "ILLUMINATED SOBHA VERDURE ENTRANCE AT DUSK"
  },
  {
    "src": "/assets/portfolio/channel-letters/babyshop-mall-storefront-entrance.png",
    "alt": "Babyshop Mall Storefront Entrance",
    "caption": "BABYSHOP MALL STOREFRONT ENTRANCE"
  },
  {
    "src": "/assets/portfolio/channel-letters/bewakoof-black-and-yellow-storefront.png",
    "alt": "Bewakoof Black-and-Yellow Storefront",
    "caption": "BEWAKOOF BLACK-AND-YELLOW STOREFRONT"
  },
  {
    "src": "/assets/portfolio/channel-letters/bold-puravankara-tower-under-gray-skies.png",
    "alt": "Bold PURAVANKARA Tower Under Gray Skies",
    "caption": "BOLD PURAVANKARA TOWER UNDER GRAY SKIES"
  },
  {
    "src": "/assets/portfolio/channel-letters/bosch-showroom-at-midnight-intersection.png",
    "alt": "Bosch Showroom at Midnight Intersection",
    "caption": "BOSCH SHOWROOM AT MIDNIGHT INTERSECTION"
  },
  {
    "src": "/assets/portfolio/channel-letters/bright-easybuy-glassfront-storefront.png",
    "alt": "Bright EasyBuy Glassfront Storefront",
    "caption": "BRIGHT EASYBUY GLASSFRONT STOREFRONT"
  },
  {
    "src": "/assets/portfolio/channel-letters/modern-boys-department-interior.png",
    "alt": "Modern Boys Department Interior",
    "caption": "MODERN BOYS DEPARTMENT INTERIOR"
  },
  {
    "src": "/assets/portfolio/channel-letters/modern-tigc-clothing-store-interior.png",
    "alt": "Modern TIGC Clothing Store Interior",
    "caption": "MODERN TIGC CLOTHING STORE INTERIOR"
  },
  {
    "src": "/assets/portfolio/channel-letters/neon-max-fashion-storefront-at-night.png",
    "alt": "Neon Max Fashion Storefront at Night",
    "caption": "NEON MAX FASHION STOREFRONT AT NIGHT"
  },
  {
    "src": "/assets/portfolio/channel-letters/nighttime-bata-storefront-showcase.png",
    "alt": "Nighttime Bata Storefront Showcase",
    "caption": "NIGHTTIME BATA STOREFRONT SHOWCASE"
  },
  {
    "src": "/assets/portfolio/channel-letters/prestige-xclusive-guitar-showcase.png",
    "alt": "Prestige Xclusive Guitar Showcase",
    "caption": "PRESTIGE XCLUSIVE GUITAR SHOWCASE"
  },
  {
    "src": "/assets/portfolio/channel-letters/sobha-dream-heights-at-night.png",
    "alt": "Sobha Dream Heights at Night",
    "caption": "SOBHA DREAM HEIGHTS AT NIGHT"
  },
  {
    "src": "/assets/portfolio/channel-letters/sobha-dream-heights-lush-modern-residence.png",
    "alt": "Sobha Dream Heights  Lush Modern Residence",
    "caption": "SOBHA DREAM HEIGHTS  LUSH MODERN RESIDENCE"
  },
  {
    "src": "/assets/portfolio/channel-letters/sobha-tower-beneath-clouded-skies.png",
    "alt": "SOBHA Tower Beneath Clouded Skies",
    "caption": "SOBHA TOWER BENEATH CLOUDED SKIES"
  }
];

export default function ChannelLetters() {
  return (
    <MotionGallery
      variant="rise"
      id="channel-letters"
      title="Channel Letters"
      description="Dimensional lettering that brings your brand to light."
      images={images}
      dark
    />
  );
}
