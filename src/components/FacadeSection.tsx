import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/facade/colorful-asian-paints-beautiful-homes-storefront.webp",
    "alt": "Colorful Asian Paints Beautiful Homes Storefront",
    "caption": "COLORFUL ASIAN PAINTS BEAUTIFUL HOMES STOREFRONT"
  },
  {
    "src": "/assets/portfolio/facade/illuminated-easybuy-storefront-at-night.webp",
    "alt": "Illuminated EasyBuy Storefront at Night",
    "caption": "ILLUMINATED EASYBUY STOREFRONT AT NIGHT"
  },
  {
    "src": "/assets/portfolio/facade/magenta-jewelry-storefront-under-renovation-1.webp",
    "alt": "Magenta Jewelry Storefront Under Renovation",
    "caption": "MAGENTA JEWELRY STOREFRONT UNDER RENOVATION"
  },
  {
    "src": "/assets/portfolio/facade/the-indian-garage-co-storefront.webp",
    "alt": "The Indian Garage Co Storefront",
    "caption": "THE INDIAN GARAGE CO STOREFRONT"
  },
  {
    "src": "/assets/portfolio/facade/vibrant-bata-storefront-on-a-sunny-street.webp",
    "alt": "Vibrant Bata Storefront on a Sunny Street",
    "caption": "VIBRANT BATA STOREFRONT ON A SUNNY STREET"
  },
  {
    "src": "/assets/portfolio/facade/vibrant-mall-storefront-row.webp",
    "alt": "Vibrant Mall Storefront Row",
    "caption": "VIBRANT MALL STOREFRONT ROW"
  }
];

export default function FacadeSection() {
  return (
    <MotionGallery
      variant="door"
      id="facade"
      title="Facade"
      description="Distinctive storefronts that make a lasting first impression."
      images={images}
    />
  );
}
