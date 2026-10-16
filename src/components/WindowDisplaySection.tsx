import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/window-display/lifestyle-party-edit-window.webp",
    "alt": "Lifestyle Party Edit Window",
    "caption": "LIFESTYLE PARTY EDIT WINDOW"
  },
  {
    "src": "/assets/portfolio/window-display/trends-autumn-window.webp",
    "alt": "Trends Autumn Window",
    "caption": "TRENDS AUTUMN WINDOW"
  },
  {
    "src": "/assets/portfolio/window-display/linen-club-utsav-window.webp",
    "alt": "Linen Club Utsav Window",
    "caption": "LINEN CLUB UTSAV WINDOW"
  },
  {
    "src": "/assets/portfolio/window-display/giva-diwali-display.webp",
    "alt": "GIVA Diwali Display",
    "caption": "GIVA DIWALI DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/act-fashion-window.webp",
    "alt": "ACT Fashion Window",
    "caption": "ACT FASHION WINDOW"
  },
  {
    "src": "/assets/portfolio/window-display/buy-3-get-2-free-sale-window.webp",
    "alt": "Buy 3 Get 2 Free Sale Window",
    "caption": "BUY 3 GET 2 FREE SALE WINDOW"
  }
];

export default function WindowDisplaySection() {
  return (
    <MotionGallery
      variant="curtain"
      id="window-display"
      title="Window Display"
      description="Creative window displays that turn passing glances into lasting impressions."
      images={images}
    />
  );
}
