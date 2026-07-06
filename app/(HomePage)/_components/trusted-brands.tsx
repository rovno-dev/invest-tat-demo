"use client";

import { Container } from "@/components/ui/container";

const brands = [
  { name: "Vercel", slug: "vercel" },
  { name: "Stripe", slug: "stripe" },
  { name: "Figma", slug: "figma" },
  { name: "Linear", slug: "linear" },
  { name: "GitHub", slug: "github" },
  { name: "Railway", slug: "railway" },
];

export function TrustedBrands() {
  return (
    <section className="py-10 md:py-12 border-y border-(--outline) bg-(--bg-disabled)">
      <Container>
        <p className="text-body-5 text-(--on-bg-low) text-center uppercase tracking-[0.15em] mb-6">
          Trusted by teams building the future
        </p>
        <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
          {brands.map((brand) => (
            <div key={brand.slug} className="h-6 md:h-8">
              <img
                src={`https://cdn.simpleicons.org/${brand.slug}/currentColor`}
                alt={brand.name}
                className="h-full w-auto opacity-60 grayscale transition-opacity hover:opacity-100 dark:invert"
              />
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
