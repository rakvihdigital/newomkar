import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/window-display/giva-raksha-bandhan-storefront-display.png",
    "alt": "GIVA Raksha Bandhan Storefront Display",
    "caption": "GIVA RAKSHA BANDHAN STOREFRONT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/autumn-vibes-at-kannada-trends.png",
    "alt": "Autumn Vibes at Kannada Trends",
    "caption": "AUTUMN VIBES AT KANNADA TRENDS"
  },
  {
    "src": "/assets/portfolio/window-display/colorful-cactus-kidswear-display.png",
    "alt": "Colorful Cactus Kidswear Display",
    "caption": "COLORFUL CACTUS KIDSWEAR DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/elegant-sage-wedding-suit-display.png",
    "alt": "Elegant Sage Wedding Suit Display",
    "caption": "ELEGANT SAGE WEDDING SUIT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/festive-linen-club-window-display.png",
    "alt": "Festive Linen Club Window Display",
    "caption": "FESTIVE LINEN CLUB WINDOW DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/festive-linen-utsav-storefront-display.png",
    "alt": "Festive Linen Utsav Storefront Display",
    "caption": "FESTIVE LINEN UTSAV STOREFRONT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/futuristic-act-fashion-display.png",
    "alt": "Futuristic ACT Fashion Display",
    "caption": "FUTURISTIC ACT FASHION DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/giva-wali-diwali-office-display.png",
    "alt": "GIVA Wali Diwali Office Display",
    "caption": "GIVA WALI DIWALI OFFICE DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/luxury-jewellery-window-display.png",
    "alt": "Luxury Jewellery Window Display",
    "caption": "LUXURY JEWELLERY WINDOW DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/luxury-mall-fragrance-display-with-handbags-and-watches.png",
    "alt": "Luxury Mall Fragrance Display with Handbags and Watches",
    "caption": "LUXURY MALL FRAGRANCE DISPLAY WITH HANDBAGS AND WATCHES"
  },
  {
    "src": "/assets/portfolio/window-display/modern-fashion-store-display-with-floral-mannequins.png",
    "alt": "Modern Fashion Store Display with Floral Mannequins",
    "caption": "MODERN FASHION STORE DISPLAY WITH FLORAL MANNEQUINS"
  },
  {
    "src": "/assets/portfolio/window-display/modern-max-storefront-with-glowing-rings.png",
    "alt": "Modern Max Storefront with Glowing Rings",
    "caption": "MODERN MAX STOREFRONT WITH GLOWING RINGS"
  },
  {
    "src": "/assets/portfolio/window-display/neon-fashion-poster-in-wood-paneled-retail-display.png",
    "alt": "Neon Fashion Poster in Wood-Paneled Retail Display",
    "caption": "NEON FASHION POSTER IN WOOD-PANELED RETAIL DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/neon-sale-window-display.png",
    "alt": "Neon SALE Window Display",
    "caption": "NEON SALE WINDOW DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/neon-y-display-at-a-modern-retail-entrance.png",
    "alt": "Neon Y Display at a Modern Retail Entrance",
    "caption": "NEON Y DISPLAY AT A MODERN RETAIL ENTRANCE"
  },
  {
    "src": "/assets/portfolio/window-display/new-arrivals-jewelry-showcase.png",
    "alt": "New Arrivals Jewelry Showcase",
    "caption": "NEW ARRIVALS JEWELRY SHOWCASE"
  },
  {
    "src": "/assets/portfolio/window-display/party-fashion-mannequins-in-a-mall-display.png",
    "alt": "Party Fashion Mannequins in a Mall Display",
    "caption": "PARTY FASHION MANNEQUINS IN A MALL DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/pixel-rabbit-storefront-display.png",
    "alt": "Pixel Rabbit Storefront Display",
    "caption": "PIXEL RABBIT STOREFRONT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/softindustrial-fashion-showcase.png",
    "alt": "Softindustrial Fashion Showcase",
    "caption": "SOFTINDUSTRIAL FASHION SHOWCASE"
  },
  {
    "src": "/assets/portfolio/window-display/spring-wedding-storefront-display.png",
    "alt": "Spring Wedding Storefront Display",
    "caption": "SPRING WEDDING STOREFRONT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/the-wedding-edit-elegant-suit-display.png",
    "alt": "The Wedding Edit  Elegant Suit Display",
    "caption": "THE WEDDING EDIT  ELEGANT SUIT DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/urban-rider-mall-showcase-display.png",
    "alt": "Urban Rider Mall Showcase Display",
    "caption": "URBAN RIDER MALL SHOWCASE DISPLAY"
  },
  {
    "src": "/assets/portfolio/window-display/van-heusen-innerwear-storefront-display.png",
    "alt": "Van Heusen Innerwear Storefront Display",
    "caption": "VAN HEUSEN INNERWEAR STOREFRONT DISPLAY"
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
