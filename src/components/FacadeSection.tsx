import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/facade/sobha.jpg",
    "alt": "Sobha Verdure Facade Signage",
    "caption": "SOBHA VERDURE"
  },
  {
    "src": "/assets/facade/bata.jpg",
    "alt": "Bata Facade Signage",
    "caption": "BATA"
  },
  {
    "src": "/assets/facade/apollo.jpg",
    "alt": "Apollo Tyres Facade Signage",
    "caption": "APOLLO TYRES"
  },
  {
    "src": "/assets/facade/westside.jpg",
    "alt": "Westside Hospital Facade Signage",
    "caption": "WESTSIDE HOSPITAL"
  }
];

export default function FacadeSection() {
  return (
    <MotionGallery
      id="facade"
      title="Facade"
      description="Distinctive storefronts that make a lasting first impression."
      images={images}
    />
  );
}
