import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/signages/siemens-showroom-signage.webp",
    "alt": "Siemens Showroom Signage",
    "caption": "SIEMENS SHOWROOM SIGNAGE"
  },
  {
    "src": "/assets/portfolio/signages/bata-sneaker-studio.webp",
    "alt": "Bata Sneaker Studio",
    "caption": "BATA SNEAKER STUDIO"
  },
  {
    "src": "/assets/portfolio/signages/mia-by-tanishq-storefront.webp",
    "alt": "Mia by Tanishq Storefront",
    "caption": "MIA BY TANISHQ STOREFRONT"
  },
  {
    "src": "/assets/portfolio/signages/victorinox-mall-storefront.webp",
    "alt": "Victorinox Mall Storefront",
    "caption": "VICTORINOX MALL STOREFRONT"
  },
  {
    "src": "/assets/portfolio/signages/hafele-design-studio.webp",
    "alt": "Häfele Design Studio",
    "caption": "HÄFELE DESIGN STUDIO"
  },
  {
    "src": "/assets/portfolio/signages/apollo-tyres-storefront.webp",
    "alt": "Apollo Tyres Storefront",
    "caption": "APOLLO TYRES STOREFRONT"
  }
];

export default function BrandSignages() {
  return (
    <MotionGallery
      id="signages"
      title="Our Honorable Brands Signages"
      description="Trusted by industry leaders."
      images={images}
    />
  );
}
