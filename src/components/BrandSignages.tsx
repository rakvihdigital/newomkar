import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/brands/lifestyle.jpg",
    "alt": "Lifestyle",
    "caption": "LIFESTYLE"
  },
  {
    "src": "/assets/brands/samsung.jpg",
    "alt": "Samsung",
    "caption": "SAMSUNG"
  },
  {
    "src": "/assets/brands/adidas.jpg",
    "alt": "Adidas",
    "caption": "ADIDAS"
  },
  {
    "src": "/assets/brands/mia-tanishq.png",
    "alt": "Mia by Tanishq",
    "caption": "MIA BY TANISHQ"
  },
  {
    "src": "/assets/brands/max.jpg",
    "alt": "Max",
    "caption": "MAX"
  },
  {
    "src": "/assets/brands/shubh.jpg",
    "alt": "Tanishq",
    "caption": "TANISHQ"
  },
  {
    "src": "/assets/brands/bata.jpg",
    "alt": "Bata",
    "caption": "BATA"
  },
  {
    "src": "/assets/brands/trends.jpg",
    "alt": "Trends",
    "caption": "TRENDS"
  },
  {
    "src": "/assets/brands/kushals.jpg",
    "alt": "Kushal's",
    "caption": "KUSHAL'S"
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
