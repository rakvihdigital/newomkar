import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/window-display/giva-raksha-bandhan-storefront-display.webp",
    "alt": "GIVA Raksha Bandhan Storefront Display",
    "caption": "GIVA RAKSHA BANDHAN STOREFRONT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/autumn-vibes-at-kannada-trends.webp",
    "alt": "Autumn Vibes at Kannada Trends",
    "caption": "AUTUMN VIBES AT KANNADA TRENDS"
  },
  {
    "src": "/assets/portfolio/window-display/colorful-cactus-kidswear-display.webp",
    "alt": "Colorful Cactus Kidswear Display",
    "caption": "COLORFUL CACTUS KIDSWEAR DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/elegant-sage-wedding-suit-display.webp",
    "alt": "Elegant Sage Wedding Suit Display",
    "caption": "ELEGANT SAGE WEDDING SUIT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/festive-linen-club-window-display.webp",
    "alt": "Festive Linen Club Window Display",
    "caption": "FESTIVE LINEN CLUB WINDOW DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/festive-linen-utsav-storefront-display.webp",
    "alt": "Festive Linen Utsav Storefront Display",
    "caption": "FESTIVE LINEN UTSAV STOREFRONT DISPLAY"
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
