import type { Metadata } from "next";
import { RwnIntegratedReference } from "@/components/RwnIntegratedReference";

export const metadata: Metadata = {
  title: "RWN — ReadyAll",
  description:
    "Comprehensive Rowing Workout Notation reference with syntax, parser behavior, canonical naming guidance, and playground-style examples.",
};

export default function RwnPage() {
  return <RwnIntegratedReference />;
}
