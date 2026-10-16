import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/channel-letters/illuminated-sobha-verdure-entrance-at-dusk.webp",
    "alt": "Illuminated Sobha Verdure Entrance at Dusk",
    "caption": "ILLUMINATED SOBHA VERDURE ENTRANCE AT DUSK"
  },
  {
    "src": "/assets/portfolio/channel-letters/babyshop-mall-storefront-entrance.webp",
    "alt": "Babyshop Mall Storefront Entrance",
    "caption": "BABYSHOP MALL STOREFRONT ENTRANCE"
  },
  {
    "src": "/assets/portfolio/channel-letters/bewakoof-black-and-yellow-storefront.webp",
    "alt": "Bewakoof Black-and-Yellow Storefront",
    "caption": "BEWAKOOF BLACK-AND-YELLOW STOREFRONT"
  },
  {
    "src": "/assets/portfolio/channel-letters/bold-puravankara-tower-under-gray-skies.webp",
    "alt": "Bold PURAVANKARA Tower Under Gray Skies",
    "caption": "BOLD PURAVANKARA TOWER UNDER GRAY SKIES"
  },
  {
    "src": "/assets/portfolio/channel-letters/bosch-showroom-at-midnight-intersection.webp",
    "alt": "Bosch Showroom at Midnight Intersection",
    "caption": "BOSCH SHOWROOM AT MIDNIGHT INTERSECTION"
  },
  {
    "src": "/assets/portfolio/channel-letters/bright-easybuy-glassfront-storefront.webp",
    "alt": "Bright EasyBuy Glassfront Storefront",
    "caption": "BRIGHT EASYBUY GLASSFRONT STOREFRONT"
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
