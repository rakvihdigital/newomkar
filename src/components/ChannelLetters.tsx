import MotionGallery from "./MotionGallery";

const images = [
  {
    "src": "/assets/channel-letters/easybuy.jpg",
    "alt": "Illuminated EasyBuy channel letters on a glass storefront",
    "caption": "EASYBUY"
  },
  {
    "src": "/assets/channel-letters/prestige.jpg",
    "alt": "Illuminated Prestige Xclusive channel letters above a storefront",
    "caption": "PRESTIGE XCLUSIVE"
  }
];

export default function ChannelLetters() {
  return (
    <MotionGallery
      variant="rise"
      id="channel-letters"
      title="Channel Letters"
      description="Dimensional lettering that brings your brand to light."
      images={images}
      dark
    />
  );
}
