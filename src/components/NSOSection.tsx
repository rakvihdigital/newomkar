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
    "src": "/assets/portfolio/nso/babyshop-baby-department.webp",
    "alt": "Babyshop Baby Department",
    "caption": "BABYSHOP BABY DEPARTMENT"
  },
  {
    "src": "/assets/portfolio/nso/asian-paints-woodtech-texture-boards.webp",
    "alt": "Asian Paints Woodtech Texture Boards",
    "caption": "ASIAN PAINTS WOODTECH TEXTURE BOARDS"
  },
  {
    "src": "/assets/portfolio/nso/fabric-board-exhibition-showroom.webp",
    "alt": "Fabric Board Exhibition Showroom",
    "caption": "FABRIC BOARD EXHIBITION SHOWROOM"
  },
  {
    "src": "/assets/portfolio/nso/michelin-showroom-reception.webp",
    "alt": "Michelin Showroom Reception",
    "caption": "MICHELIN SHOWROOM RECEPTION"
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
