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
