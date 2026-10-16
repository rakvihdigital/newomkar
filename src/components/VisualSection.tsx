import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/portfolio/visual/illuminated-neoclassical-gateway-at-night.webp",
    "alt": "Illuminated Neoclassical Gateway at Night",
    "caption": "ILLUMINATED NEOCLASSICAL GATEWAY AT NIGHT"
  },
  {
    "src": "/assets/portfolio/visual/blackberrys-mall-storefront-display.webp",
    "alt": "Blackberrys Mall Storefront Display",
    "caption": "BLACKBERRYS MALL STOREFRONT DISPLAY"
  },
  {
    "src": "/assets/portfolio/visual/easybuy-summer-fashion-billboard.webp",
    "alt": "EasyBuy Summer Fashion Billboard",
    "caption": "EASYBUY SUMMER FASHION BILLBOARD"
  },
  {
    "src": "/assets/portfolio/visual/karmio-gifts-of-goodness-sign.webp",
    "alt": "Karmio Gifts of Goodness Sign",
    "caption": "KARMIO GIFTS OF GOODNESS SIGN"
  },
  {
    "src": "/assets/portfolio/visual/love-alfie-jewelry-showcase.webp",
    "alt": "Love Alfie Jewelry Showcase",
    "caption": "LOVE ALFIE JEWELRY SHOWCASE"
  },
  {
    "src": "/assets/portfolio/visual/mediterranean-villa-mural-lightbox.webp",
    "alt": "Mediterranean Villa Mural Lightbox",
    "caption": "MEDITERRANEAN VILLA MURAL LIGHTBOX"
  }
];

export default function VisualSection() {
  return (
    <MotionGallery
      variant="wipe"
      id="visual"
      title="Visual"
      description="Compelling retail visuals that tell your brand story."
      images={images}
    />
  );
}
