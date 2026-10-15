import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/facade/colorful-asian-paints-beautiful-homes-storefront.png",
    "alt": "Colorful Asian Paints Beautiful Homes Storefront",
    "caption": "COLORFUL ASIAN PAINTS BEAUTIFUL HOMES STOREFRONT"
  },
  {
    "src": "/assets/portfolio/facade/illuminated-easybuy-storefront-at-night.png",
    "alt": "Illuminated EasyBuy Storefront at Night",
    "caption": "ILLUMINATED EASYBUY STOREFRONT AT NIGHT"
  },
  {
    "src": "/assets/portfolio/facade/magenta-jewelry-storefront-under-renovation-1.png",
    "alt": "Magenta Jewelry Storefront Under Renovation",
    "caption": "MAGENTA JEWELRY STOREFRONT UNDER RENOVATION"
  },
  {
    "src": "/assets/portfolio/facade/the-indian-garage-co-storefront.png",
    "alt": "The Indian Garage Co Storefront",
    "caption": "THE INDIAN GARAGE CO STOREFRONT"
  },
  {
    "src": "/assets/portfolio/facade/vibrant-bata-storefront-on-a-sunny-street.png",
    "alt": "Vibrant Bata Storefront on a Sunny Street",
    "caption": "VIBRANT BATA STOREFRONT ON A SUNNY STREET"
  },
  {
    "src": "/assets/portfolio/facade/vibrant-mall-storefront-row.png",
    "alt": "Vibrant Mall Storefront Row",
    "caption": "VIBRANT MALL STOREFRONT ROW"
  },
  {
    "src": "/assets/portfolio/facade/whatsapp-image-2026-10-14-at-7-14-58-pm.jpeg",
    "alt": "Retail Facade",
    "caption": "RETAIL FACADE"
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
