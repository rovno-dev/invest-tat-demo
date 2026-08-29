"use client";
import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/container";
import { RequestDialog } from "@/components/layout/request/request-dialog";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";

/* SVG Illustrations (kept from previous version) */
function PenDocument() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto" fill="none">
      <circle cx="50" cy="40" r="3" fill="#93C5FD" />
      <circle cx="80" cy="120" r="2" fill="#93C5FD" />
      <circle cx="40" cy="200" r="2" fill="#93C5FD" />
      <circle cx="350" cy="50" r="2" fill="#93C5FD" />
      <circle cx="320" cy="280" r="3" fill="#93C5FD" />
      <circle cx="380" cy="160" r="2" fill="#93C5FD" />
      <rect x="100" y="60" width="200" height="240" rx="4" fill="white" stroke="#1E293B" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="100" x2="280" y2="100" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="130" x2="280" y2="130" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="160" x2="280" y2="160" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="190" x2="280" y2="190" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="220" x2="280" y2="220" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="250" x2="280" y2="250" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <path d="M290 160 C 320 140, 340 110, 360 90" stroke="#E03131" strokeWidth="4" strokeLinecap="round" />
      <path d="M360 90 L370 100 L360 90" stroke="#E03131" strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M340 120 L350 110 L340 120" stroke="#E03131" strokeWidth="3" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function MapPin() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto" fill="none">
      <circle cx="60" cy="50" r="3" fill="#93C5FD" />
      <circle cx="100" cy="150" r="2" fill="#93C5FD" />
      <circle cx="340" cy="80" r="2" fill="#93C5FD" />
      <circle cx="320" cy="260" r="3" fill="#93C5FD" />
      <path d="M80 80 L180 60 L250 80 L330 70 L330 240 L230 260 L160 240 L80 250 Z" stroke="#1E293B" strokeWidth="2" fill="white" />
      <path d="M80 80 L180 60 L250 80 L330 70" stroke="#1E293B" strokeWidth="2" />
      <path d="M180 60 L180 240" stroke="#94A3B8" strokeWidth="1" />
      <path d="M250 80 L250 260" stroke="#94A3B8" strokeWidth="1" />
      <path d="M230 130 C 220 130, 210 150, 210 170 C 210 200, 230 230, 230 230 C 230 230, 250 200, 250 170 C 250 150, 240 130, 230 130 Z" fill="#E03131" />
      <circle cx="230" cy="170" r="10" fill="white" />
    </svg>
  );
}
function Scissors() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto" fill="none">
      <circle cx="60" cy="100" r="3" fill="#93C5FD" />
      <circle cx="330" cy="50" r="2" fill="#93C5FD" />
      <circle cx="350" cy="240" r="2" fill="#93C5FD" />
      <circle cx="80" cy="250" r="3" fill="#93C5FD" />
      <rect x="70" y="60" width="240" height="230" rx="6" fill="white" stroke="#1E293B" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="90" y1="100" x2="290" y2="100" stroke="#60A5FA" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="90" y1="130" x2="290" y2="130" stroke="#60A5FA" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="90" y1="160" x2="290" y2="160" stroke="#60A5FA" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="90" y1="190" x2="290" y2="190" stroke="#60A5FA" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="90" y1="220" x2="290" y2="220" stroke="#60A5FA" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="90" y1="250" x2="290" y2="250" stroke="#60A5FA" strokeWidth="2" transform="rotate(-2 190 175)" />
      <line x1="70" y1="175" x2="310" y2="175" stroke="#E03131" strokeWidth="2.5" strokeDasharray="8 5" transform="rotate(-2 190 175)" />
      <path d="M240 175 L150 125" stroke="#E03131" strokeWidth="4" strokeLinecap="round" />
      <path d="M240 175 L150 225" stroke="#E03131" strokeWidth="4" strokeLinecap="round" />
      <circle cx="240" cy="175" r="6" fill="#E03131" />
      <circle cx="240" cy="175" r="2.5" fill="white" />
      <circle cx="310" cy="115" r="10" stroke="#E03131" strokeWidth="3" fill="none" />
      <circle cx="310" cy="235" r="10" stroke="#E03131" strokeWidth="3" fill="none" />
    </svg>
  );
}
function StampDocument() {
  return (
    <svg viewBox="0 0 400 320" className="w-full max-w-md h-auto" fill="none">
      <circle cx="50" cy="40" r="3" fill="#93C5FD" />
      <circle cx="80" cy="120" r="2" fill="#93C5FD" />
      <circle cx="40" cy="200" r="2" fill="#93C5FD" />
      <circle cx="350" cy="50" r="2" fill="#93C5FD" />
      <circle cx="320" cy="280" r="3" fill="#93C5FD" />
      <circle cx="380" cy="160" r="2" fill="#93C5FD" />
      <rect x="100" y="60" width="200" height="240" rx="4" fill="white" stroke="#1E293B" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="100" x2="280" y2="100" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="130" x2="280" y2="130" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="160" x2="280" y2="160" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="190" x2="280" y2="190" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="220" x2="280" y2="220" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <line x1="120" y1="250" x2="280" y2="250" stroke="#60A5FA" strokeWidth="2" transform="rotate(-3 200 180)" />
      <circle cx="230" cy="200" r="30" fill="#E03131" opacity="0.8" transform="rotate(-15 230 200)" />
      <circle cx="230" cy="200" r="22" stroke="white" strokeWidth="2" transform="rotate(-15 230 200)" />
      <circle cx="270" cy="230" r="25" fill="#E03131" opacity="0.6" transform="rotate(10 270 230)" />
      <circle cx="270" cy="230" r="18" stroke="white" strokeWidth="2" transform="rotate(10 270 230)" />
    </svg>
  );
}
/* Data */
const steps = [
  {
    id: 1,
    title: "Project Strategy Development",
    items: [
      "We will perform a research of the market for implementation of your business potential as investor.",
      "We will provide you with the following information: infrastructure and resource potential of the Republic of Tatarstan, key industries; government support for businesses; tax structure.",
      "Assistance in selecting an optimal strategy for entering the market of the Republic of Tatarstan.",
      "Assistance in sourcing of raw industrial materials required for final product manufacturing.",
      "Selecting manufacturers and service providers required for implementation of the business project.",
      "Assistance in negotiation with government institutions and public authorities regarding the legal basis of the project.",
    ],
    illustration: <PenDocument />,
  },
  {
    id: 2,
    title: "Choosing the Investment Site",
    items: [
      "We will offer an optimal business site based on the provided information and technical specifications of the project.",
      "We will organise site visits before you make a final decision.",
    ],
    illustration: <MapPin />,
  },
  {
    id: 3,
    title: "Setting up a business entity",
    items: [
      "Consultation on any matters arising in the process of the investment project implementation: tax and statute legislation; project financing; forms of state support provision; staff resourcing.",
      "Support at all important stages of the investment project implementation. The staff of the Agency will improve your time schedule; render support in negotiation with authorities.",
      "We will give information assistance in establishment of the form entity.",
    ],
    illustration: <Scissors />,
  },
  {
    id: 4,
    title: "Investors Support",
    items: [
      "An investor of implementable or implemented project is invited to become a member of the Investment Club of the Republic of Tatarstan.",
      "Free support by the Tatarstan Investment Development Agency.",
      "Informational support related to the continuous development in the region.",
      "Quarterly meetings of Investors Club with participation of the local Government, relevant ministries and departments for informal discussions and problem solving.",
      "Invitation to regional, national, federal and global business events of Tatarstan.",
    ],
    illustration: <StampDocument />,
  },
];
export function InvestorPath() {
  const [activeStep, setActiveStep] = useState(1);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const stepId = Number(entry.target.getAttribute("data-step-id"));
            if (stepId) setActiveStep(stepId);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: 0.1 }
    );
    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });
    return () => observer.disconnect();
  }, []);

  const scrollToStep = (id: number) => {
    const ref = stepRefs.current[id - 1];
    if (ref) {
      ref.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const progress = ((activeStep - 1) / (steps.length - 1)) * 100;

  return (
    <section id="investor-path" className="py-16 bg-(--bg)">
      <Container className="relative">
        {/* Header */}
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <h2 className="text-display-2 font-semibold">Single window for investors</h2>
          <p className="mt-3 text-body-3 text-(--on-bg-medium)">
            Investors are supported on a one stop shop basis in the Republic of Tatarstan
          </p>
        </div>

        {/* Sticky Top Timeline Bar */}
        <div className="sticky top-[80px] lg:top-[110px] -mx-4 px-4 z-50 mb-16">
          <div className=" bg-bg/80 backdrop-blur-lg rounded-2xl border border-(--outline) shadow-lg p-4 max-w-5xl mx-auto">
            <div className="relative">
              {/* Step Dots */}
              <div className="no-scrollbar overflow-x-scroll relative flex justify-between">
                {steps.map((step) => (
                  <Button
                    variant={'text'}
                    key={step.id}
                    onClick={() => scrollToStep(step.id)}
                    className="flex flex-col items-center gap-2 group py-2"
                  >
                    <span
                      className={cn(
                        "size-4 rounded-full border-2 transition-all duration-300 bg-(--bg)",
                        activeStep === step.id
                          ? "border-(--primary) scale-125"
                          : "border-(--outline) group-hover:border-(--primary)"
                      )}
                    />
                    <span
                      className={cn(
                        "text-xs transition-colors",
                        activeStep === step.id ? "text-(--primary)" : "text-(--on-bg-low)"
                      )}
                    >
                      Step {step.id}
                    </span>
                  </Button>
                ))}
              </div>
              {/* Progress Line */}
              <div className="relative h-0.5">
                <div className="top-0 left-0 absolute right-0 h-full bg-(--outline) -translate-y-1/2" />
                <div
                  className="top-0 left-0 absolute h-full bg-(--primary) -translate-y-1/2 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Content - Vertical Steps */}
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 gap-12">
            {steps.map((step, index) => (
              <div
                key={step.id}
                data-step-id={step.id}
                ref={(el) => {
                  stepRefs.current[index] = el;
                }}
                className={cn(
                  "transition-opacity duration-500 scroll-mt-[150px] lg:scroll-mt-[180px]",
                  activeStep === step.id ? "opacity-100" : "opacity-60"
                )}
              >
                {/* Step Title */}
                <h3 className="text-display-3 font-semibold mb-8">{step.title}</h3>
                {/* Illustration */}
                <div className="flex justify-center mb-8">{step.illustration}</div>
                {/* Text Content */}
                <ol className="space-y-4">
                  {step.items.map((item, idx) => (
                    <li
                      key={idx}
                      className="flex gap-3 text-body-3 leading-relaxed text-(--on-bg-medium)"
                    >
                      <span className="font-medium text-(--primary) mt-0.5 shrink-0">{idx + 1}.</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ol>
                {/* CTA (visible only on last step) */}
                {step.id === steps.length && (
                  <div className="mt-10 flex justify-end">
                    <RequestDialog>
                      <Button variant="outlined" size="large" shape="round">
                        Contact the Agency
                      </Button>
                    </RequestDialog>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
