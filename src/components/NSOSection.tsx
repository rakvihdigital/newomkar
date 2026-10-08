import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/nso/max.jpg",
    "alt": "Max retail interior with an illuminated campaign display",
    "caption": "MAX"
  },
  {
    "src": "/assets/nso/girls.jpg",
    "alt": "Illuminated Girls department signage and retail fixtures",
    "caption": "GIRLS DEPARTMENT"
  },
  {
    "src": "/assets/nso/us-polo.jpg",
    "alt": "U.S. Polo Assn. branded retail display and shelving",
    "caption": "U.S. POLO ASSN."
  },
  {
    "src": "/assets/nso/colour-showroom.jpg",
    "alt": "Paint and finishes showroom with product displays",
    "caption": "PAINT & FINISHES SHOWROOM"
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
