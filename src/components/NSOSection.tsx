import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/nso/modern-asian-paints-showroom-display.webp",
    "alt": "Modern Asian Paints Showroom Display",
    "caption": "MODERN ASIAN PAINTS SHOWROOM DISPLAY"
  },
  {
    "src": "/assets/portfolio/nso/asian-paints-woodtech-texture-showcase.webp",
    "alt": "Asian Paints Woodtech Texture Showcase",
    "caption": "ASIAN PAINTS WOODTECH TEXTURE SHOWCASE"
  },
  {
    "src": "/assets/portfolio/nso/elegant-u-s-polo-assn-retail-display.webp",
    "alt": "Elegant U.S. Polo Assn. Retail Display",
    "caption": "ELEGANT U.S. POLO ASSN. RETAIL DISPLAY"
  },
  {
    "src": "/assets/portfolio/nso/max-fashion-nighttime-storefront.webp",
    "alt": "Max Fashion Nighttime Storefront",
    "caption": "MAX FASHION NIGHTTIME STOREFRONT"
  },
  {
    "src": "/assets/portfolio/nso/modern-baby-department-showroom.webp",
    "alt": "Modern Baby Department Showroom",
    "caption": "MODERN BABY DEPARTMENT SHOWROOM"
  },
  {
    "src": "/assets/portfolio/nso/modern-girls-department-store-interior.webp",
    "alt": "Modern Girls’ Department Store Interior",
    "caption": "MODERN GIRLS’ DEPARTMENT STORE INTERIOR"
  }
];

export default function NSOSection() {
  return (
    <MotionGallery
      variant="iris"
      id="nso"
      title="NSO"
      description="Bringing new retail spaces to life, from signage to in-store displays."
      images={images}
      dark
    />
  );
}
