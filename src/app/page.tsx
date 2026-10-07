'use client';

import { useEffect, useRef } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FacilityHeroSequence from "@/components/FacilityHeroSequence";
import BrandSignages from "@/components/BrandSignages";
import ChannelLetters from "@/components/ChannelLetters";
import FacadeSection from "@/components/FacadeSection";
import NSOSection from "@/components/NSOSection";
import WindowDisplaySection from "@/components/WindowDisplaySection";
import MallClusterDisplaySection from "@/components/MallClusterDisplaySection";
import TradeShowSection from "@/components/TradeShowSection";
import ArchGateSection from "@/components/ArchGateSection";
import VisualSection from "@/components/VisualSection";
import MimakiSequence from "@/components/MimakiSequence";
import TPSSequence from "@/components/TPSSequence";
import GreyMachineSequence from "@/components/GreyMachineSequence";
import UltimateMachineSequence from "@/components/UltimateMachineSequence";
import IndiaMapSection from "@/components/IndiaMapSection";
import ISOSection from "@/components/ISOSection";
import BrandsPuzzle from "@/components/BrandsPuzzle";
import MachineryTitle from "@/components/MachineryTitle";
import ThankYouSection from "@/components/ThankYouSection";

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const main = mainRef.current;
    if (!main) return;
    // Galleries grow as their photos load; re-measure the GSAP sections below them so
    // pinned scenes (Our Services, ISO, Brands) don't start at stale positions and replay.
    let settledHeight = main.offsetHeight;
    let timer = 0;
    const observer = new ResizeObserver(() => {
      window.clearTimeout(timer);
      timer = window.setTimeout(() => {
        if (main.offsetHeight === settledHeight) return;
        ScrollTrigger.refresh();
        settledHeight = main.offsetHeight;
      }, 120);
    });
    observer.observe(main);
    return () => {
      window.clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  return (
    <main ref={mainRef}>
      <FacilityHeroSequence />
      <BrandSignages />
      <ChannelLetters />
      <FacadeSection />
      <NSOSection />
      <WindowDisplaySection />
      <MallClusterDisplaySection />
      <TradeShowSection />
      <ArchGateSection />
      <VisualSection />
      <MachineryTitle />
      <MimakiSequence />
      <TPSSequence />
      <GreyMachineSequence />
      <UltimateMachineSequence />
      <IndiaMapSection />
      <BrandsPuzzle />
      <ISOSection />
      <ThankYouSection />
    </main>
  );
}
