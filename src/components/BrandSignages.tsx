import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/signages/samsung-storefront-on-a-bustling-urban-street.webp",
    "alt": "Samsung Storefront on a Bustling Urban Street",
    "caption": "SAMSUNG STOREFRONT ON A BUSTLING URBAN STREET"
  },
  {
    "src": "/assets/portfolio/signages/apollo-tyres-storefront-in-kannada.webp",
    "alt": "Apollo Tyres Storefront in Kannada",
    "caption": "APOLLO TYRES STOREFRONT IN KANNADA"
  },
  {
    "src": "/assets/portfolio/signages/bright-bata-sneaker-studio-storefront.webp",
    "alt": "Bright Bata Sneaker Studio Storefront",
    "caption": "BRIGHT BATA SNEAKER STUDIO STOREFRONT"
  },
  {
    "src": "/assets/portfolio/signages/bright-mall-storefronts-mochi-mia-aurelia.webp",
    "alt": "Bright Mall Storefronts  Mochi, Mia, Aurelia",
    "caption": "BRIGHT MALL STOREFRONTS  MOCHI, MIA, AURELIA"
  },
  {
    "src": "/assets/portfolio/signages/colorful-paint-and-hardware-storefront.webp",
    "alt": "Colorful Paint and Hardware Storefront",
    "caption": "COLORFUL PAINT AND HARDWARE STOREFRONT"
  },
  {
    "src": "/assets/portfolio/signages/hafele-appliances-studio-frontage.webp",
    "alt": "Häfele Appliances Studio Frontage",
    "caption": "HÄFELE APPLIANCES STUDIO FRONTAGE"
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
