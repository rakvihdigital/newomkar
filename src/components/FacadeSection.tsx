import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/facade/puravankara-50th-anniversary-facade.webp",
    "alt": "Puravankara 50th Anniversary Facade",
    "caption": "PURAVANKARA 50TH ANNIVERSARY FACADE"
  },
  {
    "src": "/assets/portfolio/facade/asian-paints-beautiful-homes.webp",
    "alt": "Asian Paints Beautiful Homes",
    "caption": "ASIAN PAINTS BEAUTIFUL HOMES"
  },
  {
    "src": "/assets/portfolio/facade/max-fashion-storefront.webp",
    "alt": "Max Fashion Storefront",
    "caption": "MAX FASHION STOREFRONT"
  },
  {
    "src": "/assets/portfolio/facade/easybuy-storefront-at-night.webp",
    "alt": "EasyBuy Storefront at Night",
    "caption": "EASYBUY STOREFRONT AT NIGHT"
  },
  {
    "src": "/assets/portfolio/facade/the-indian-garage-co-storefront.webp",
    "alt": "The Indian Garage Co Storefront",
    "caption": "THE INDIAN GARAGE CO STOREFRONT"
  },
  {
    "src": "/assets/portfolio/facade/united-colors-of-benetton-facade.webp",
    "alt": "United Colors of Benetton Facade",
    "caption": "UNITED COLORS OF BENETTON FACADE"
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
