import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/trade-show/luxurious-luxe-menswear-display.webp",
    "alt": "Luxurious LUXE Menswear Display",
    "caption": "LUXURIOUS LUXE MENSWEAR DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/ceremony-evening-collection-display.webp",
    "alt": "Ceremony Evening Collection Display",
    "caption": "CEREMONY EVENING COLLECTION DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/elegant-fabric-exhibition-showroom.webp",
    "alt": "Elegant Fabric Exhibition Showroom",
    "caption": "ELEGANT FABRIC EXHIBITION SHOWROOM"
  },
  {
    "src": "/assets/portfolio/trade-show/elegant-roadshow-display-lobby.webp",
    "alt": "Elegant Roadshow Display Lobby",
    "caption": "ELEGANT ROADSHOW DISPLAY LOBBY"
  },
  {
    "src": "/assets/portfolio/trade-show/escapism-aw-2026-mannequin-display.webp",
    "alt": "Escapism AW 2026 Mannequin Display",
    "caption": "ESCAPISM AW 2026 MANNEQUIN DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/lee-smiley-pop-up-display.webp",
    "alt": "Lee Smiley Pop-Up Display",
    "caption": "LEE SMILEY POP-UP DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/symmetrical-linen-fashion-showroom.webp",
    "alt": "Symmetrical Linen Fashion Showroom",
    "caption": "SYMMETRICAL LINEN FASHION SHOWROOM"
  },
  {
    "src": "/assets/portfolio/trade-show/urban-oasis-summer-collection-display.webp",
    "alt": "Urban Oasis Summer Collection Display",
    "caption": "URBAN OASIS SUMMER COLLECTION DISPLAY"
  }
];

export default function TradeShowSection() {
  return (
    <MotionGallery
      variant="standup"
      id="trade-show"
      title="Trade Show"
      description="Exhibition displays that put your brand at the centre of attention."
      images={images}
    />
  );
}
