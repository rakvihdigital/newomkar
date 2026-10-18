import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/trade-show/lee-smiley-pop-up-display.webp",
    "alt": "Lee Smiley Pop-Up Display",
    "caption": "LEE SMILEY POP-UP DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/linen-collection-showroom.webp",
    "alt": "Linen Collection Showroom",
    "caption": "LINEN COLLECTION SHOWROOM"
  },
  {
    "src": "/assets/portfolio/trade-show/urban-oasis-summer-collection.webp",
    "alt": "Urban Oasis Summer Collection",
    "caption": "URBAN OASIS SUMMER COLLECTION"
  },
  {
    "src": "/assets/portfolio/trade-show/escapism-aw-collection-display.webp",
    "alt": "Escapism AW Collection Display",
    "caption": "ESCAPISM AW COLLECTION DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/luxe-menswear-display.webp",
    "alt": "LUXE Menswear Display",
    "caption": "LUXE MENSWEAR DISPLAY"
  },
  {
    "src": "/assets/portfolio/trade-show/arvind-roadshow-display-lobby.webp",
    "alt": "Arvind Roadshow Display Lobby",
    "caption": "ARVIND ROADSHOW DISPLAY LOBBY"
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
