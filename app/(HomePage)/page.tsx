import { ElementsShowcase } from "./_components/elements-showcase";
import { HeroSection } from "./_components/hero-section";
import { TypographyColorShowcase } from "./_components/typography-color-showcase";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ElementsShowcase />
      <TypographyColorShowcase />
    </>
  );
}