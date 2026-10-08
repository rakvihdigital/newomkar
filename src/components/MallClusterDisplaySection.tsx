import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/mall-cluster-display/babyshop.jpg",
    "alt": "Babyshop mall cluster display with a school bus and illuminated cacti",
    "caption": "BABYSHOP"
  },
  {
    "src": "/assets/mall-cluster-display/mia.jpg",
    "alt": "Mia by Tanishq mall cluster display with pink gift boxes",
    "caption": "MIA BY TANISHQ"
  },
  {
    "src": "/assets/mall-cluster-display/homecentre.jpg",
    "alt": "Homecentre furniture cluster display with an illuminated arch",
    "caption": "HOMECENTRE"
  },
  {
    "src": "/assets/mall-cluster-display/jewellery.jpg",
    "alt": "Jewellery promotional cluster displays for Mother's Day and Akshaya Tritiya",
    "caption": "FESTIVE JEWELLERY DISPLAY"
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
