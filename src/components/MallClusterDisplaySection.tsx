import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/mall-cluster-display/mia-by-tanishq-atrium-display.webp",
    "alt": "Mia by Tanishq Atrium Display",
    "caption": "MIA BY TANISHQ ATRIUM DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/max-18th-anniversary-display.webp",
    "alt": "Max 18th Anniversary Display",
    "caption": "MAX 18TH ANNIVERSARY DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/homecentre-living-room-showcase.webp",
    "alt": "Homecentre Living Room Showcase",
    "caption": "HOMECENTRE LIVING ROOM SHOWCASE"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/shubh-akshaya-tritiya-display.webp",
    "alt": "Shubh Akshaya Tritiya Display",
    "caption": "SHUBH AKSHAYA TRITIYA DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/babyshop-back-to-school-display.webp",
    "alt": "Babyshop Back to School Display",
    "caption": "BABYSHOP BACK TO SCHOOL DISPLAY"
  },
  {
    "src": "/assets/portfolio/mall-cluster-display/blackberrys-tech-pro-display.webp",
    "alt": "Blackberrys Tech Pro Display",
    "caption": "BLACKBERRYS TECH PRO DISPLAY"
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
