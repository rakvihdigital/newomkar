import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/mall-cluster-display/mia-gift-crown-atrium-display.webp",
    "alt": "Mia Gift Crown Atrium Display",
    "caption": "MIA GIFT CROWN ATRIUM DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/akshaya-tritiya-jewelry-display.webp",
    "alt": "Akshaya Tritiya Jewelry Display",
    "caption": "AKSHAYA TRITIYA JEWELRY DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/back-to-school-mall-display.webp",
    "alt": "Back to School Mall Display",
    "caption": "BACK TO SCHOOL MALL DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/blackberrys-tech-pro-mall-display.webp",
    "alt": "Blackberrys Tech Pro Mall Display",
    "caption": "BLACKBERRYS TECH PRO MALL DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/elegant-rose-gold-mothers-day-display.webp",
    "alt": "Elegant Rose-Gold Mother’s Day Display",
    "caption": "ELEGANT ROSE-GOLD MOTHER’S DAY DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/elegant-sage-wedding-suit-display.webp",
    "alt": "Elegant Sage Wedding Suit Display",
    "caption": "ELEGANT SAGE WEDDING SUIT DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/golden-floral-ceremony-backdrop.webp",
    "alt": "Golden Floral Ceremony Backdrop",
    "caption": "GOLDEN FLORAL CEREMONY BACKDROP"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/homecentre-living-room-showcase.webp",
    "alt": "Homecentre Living Room Showcase",
    "caption": "HOMECENTRE LIVING ROOM SHOWCASE"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/illuminated-max-18th-anniversary-display.webp",
    "alt": "Illuminated Max 18th Anniversary Display",
    "caption": "ILLUMINATED MAX 18TH ANNIVERSARY DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/lee-smiley-pop-up-in-a-luxe-corridor.webp",
    "alt": "Lee Smiley Pop-Up in a Luxe Corridor",
    "caption": "LEE SMILEY POP-UP IN A LUXE CORRIDOR"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/luxury-bad-boy-mall-display.webp",
    "alt": "Luxury BAD BOY Mall Display",
    "caption": "LUXURY BAD BOY MALL DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/modern-red-ring-product-showcase.webp",
    "alt": "Modern Red Ring Product Showcase",
    "caption": "MODERN RED RING PRODUCT SHOWCASE"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/the-wedding-edit-elegant-suit-display.webp",
    "alt": "The Wedding Edit  Elegant Suit Display",
    "caption": "THE WEDDING EDIT  ELEGANT SUIT DISPLAY"
  }
];

export default function MallClusterDisplaySection() {
  return (
    <MotionGallery
      variant="drop"
      id="mall-cluster"
      title="Mall Cluster Display"
      description="Bold brand installations that bring mall spaces to life."
      images={images}
      dark
    />
  );
}
