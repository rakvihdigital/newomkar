import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/channel-letters/sobha-verdure-entrance.webp",
    "alt": "Sobha Verdure Entrance",
    "caption": "SOBHA VERDURE ENTRANCE"
  },
  {
    "src": "/assets/portfolio/channel-letters/max-fashion-storefront.webp",
    "alt": "Max Fashion Storefront",
    "caption": "MAX FASHION STOREFRONT"
  },
  {
    "src": "/assets/portfolio/channel-letters/babyshop-mall-storefront.webp",
    "alt": "Babyshop Mall Storefront",
    "caption": "BABYSHOP MALL STOREFRONT"
  },
  {
    "src": "/assets/portfolio/channel-letters/easybuy-glassfront-storefront.webp",
    "alt": "EasyBuy Glassfront Storefront",
    "caption": "EASYBUY GLASSFRONT STOREFRONT"
  },
  {
    "src": "/assets/portfolio/channel-letters/tigc-store-interior.webp",
    "alt": "TIGC Store Interior",
    "caption": "TIGC STORE INTERIOR"
  },
  {
    "src": "/assets/portfolio/channel-letters/bosch-showroom-at-night.webp",
    "alt": "Bosch Showroom at Night",
    "caption": "BOSCH SHOWROOM AT NIGHT"
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
