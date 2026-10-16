import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/nso/max-new-store-fit-out.webp",
    "alt": "Max New Store Fit-Out",
    "caption": "MAX NEW STORE FIT-OUT"
  },
  {
    "src": "/assets/portfolio/nso/asian-paints-showroom.webp",
    "alt": "Asian Paints Showroom",
    "caption": "ASIAN PAINTS SHOWROOM"
  },
  {
    "src": "/assets/portfolio/nso/us-polo-assn-retail-display.webp",
    "alt": "U.S. Polo Assn. Retail Display",
    "caption": "U.S. POLO ASSN. RETAIL DISPLAY"
  },
  {
    "src": "/assets/portfolio/nso/babyshop-baby-department.webp",
    "alt": "Babyshop Baby Department",
    "caption": "BABYSHOP BABY DEPARTMENT"
  },
  {
    "src": "/assets/portfolio/visual/xiaomi-home-mall-storefront.webp",
    "alt": "Xiaomi Home Mall Storefront",
    "caption": "XIAOMI HOME MALL STOREFRONT"
  },
  {
    "src": "/assets/portfolio/visual/samsung-storefront.webp",
    "alt": "Samsung Storefront",
    "caption": "SAMSUNG STOREFRONT"
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
