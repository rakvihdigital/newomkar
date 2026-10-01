'use client';

import MimakiSequence from "@/components/MimakiSequence";
import TPSSequence from "@/components/TPSSequence";
import GreyMachineSequence from "@/components/GreyMachineSequence";
import UltimateMachineSequence from "@/components/UltimateMachineSequence";

import ISOSection from "@/components/ISOSection";
import BrandsPuzzle from "@/components/BrandsPuzzle";

export default function Home() {
  return (
    <main>
      <MimakiSequence />
      <TPSSequence />
      <GreyMachineSequence />
      <UltimateMachineSequence />

      <ISOSection />
      <BrandsPuzzle />
    </main>
  );
}

