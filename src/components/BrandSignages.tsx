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
  },
  {
    "src": "/assets/portfolio/signages/mirrored-sobha-rooftop-signage-under-dramatic-skies.webp",
    "alt": "Mirrored SOBHA Rooftop Signage Under Dramatic Skies",
    "caption": "MIRRORED SOBHA ROOFTOP SIGNAGE UNDER DRAMATIC SKIES"
  },
  {
    "src": "/assets/portfolio/signages/modern-bata-storefront-on-a-sunny-street.webp",
    "alt": "Modern Bata Storefront on a Sunny Street",
    "caption": "MODERN BATA STOREFRONT ON A SUNNY STREET"
  },
  {
    "src": "/assets/portfolio/signages/modern-hafele-design-studio-showroom-1.webp",
    "alt": "Modern Häfele Design Studio Showroom",
    "caption": "MODERN HÄFELE DESIGN STUDIO SHOWROOM"
  },
  {
    "src": "/assets/portfolio/signages/modern-tigc-fashion-store-interior.webp",
    "alt": "Modern TIGC Fashion Store Interior",
    "caption": "MODERN TIGC FASHION STORE INTERIOR"
  },
  {
    "src": "/assets/portfolio/signages/nighttime-nexus-shantiniketan-mall-facade.webp",
    "alt": "Nighttime Nexus Shantiniketan Mall Facade",
    "caption": "NIGHTTIME NEXUS SHANTINIKETAN MALL FACADE"
  },
  {
    "src": "/assets/portfolio/signages/rectified-mia-by-tanishq-storefront.webp",
    "alt": "Rectified Mia by Tanishq Storefront",
    "caption": "RECTIFIED MIA BY TANISHQ STOREFRONT"
  },
  {
    "src": "/assets/portfolio/signages/victorinox-storefront-in-a-modern-mall.webp",
    "alt": "Victorinox Storefront in a Modern Mall",
    "caption": "VICTORINOX STOREFRONT IN A MODERN MALL"
  },
  {
    "src": "/assets/portfolio/signages/wide-crisp-high-resolution-exterior-storefront-p.webp",
    "alt": "Storefront Signage",
    "caption": "STOREFRONT SIGNAGE"
  },
  {
    "src": "/assets/portfolio/signages/wide-realistic-high-resolution-daytime-street-st.webp",
    "alt": "Storefront Signage",
    "caption": "STOREFRONT SIGNAGE"
  },
  {
    "src": "/assets/portfolio/signages/xiaomi-home-mall-storefront-1.webp",
    "alt": "Xiaomi Home Mall Storefront",
    "caption": "XIAOMI HOME MALL STOREFRONT"
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
