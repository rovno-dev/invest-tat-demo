"use client";

import { useState, useEffect } from "react";
import { Container } from "@/components/ui/container";
import Link from "next/link";
import Logotype from "./logotype/logotype";
import { Button } from "../ui/button";
import { NavLink } from "./nav-link";
import { GithubLogotypeMonoIcon } from "../icons/logotypes/github-logotype-mono-icon";
import { ROUTES } from "@/utils/constants/routes";

export default function Header() {
  const [stars, setStars] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStars() {
      try {
        const res = await fetch(
          "https://api.github.com/repos/niyazgim/unideka-ui-template"
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setStars(data.stargazers_count);
      } catch {
        setStars(null);
      } finally {
        setLoading(false);
      }
    }
    fetchStars();
  }, []);

  const starsDisplay = loading ? "…" : stars !== null ? stars.toLocaleString() : "—";

  return (
    <header
      className="h-[55px] md:h-[70px] 
      fixed top-0 left-0 right-0 w-full z-50 
      flex items-center
      bg-(--card-glass) backdrop-blur-glass border-b border-b-(--card-glass)"
    >
      <Container className="flex justify-between items-center">
        <div className="flex items-center gap-8">
          <Link href="/">
            <Logotype className="!h-[30px] sm:h-[40px]" />
          </Link>

          <nav className="hidden md:flex gap-4 text-sm">
            {/* <NavLink href={ROUTES.job}>Вакансии</NavLink> */}
            {/* <NavLink href={ROUTES.blog.href}>Блог</NavLink> */}
          </nav>
        </div>

        <Button
          asChild
          variant="outlined"
          size="small"
          className="gap-2 border-primary/30 hover:border-primary text-xs px-3 py-1 h-8"
        >
          <a
            href="https://github.com/niyazgim/unideka-ui-template"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1"
          >
            <GithubLogotypeMonoIcon className="size-4" />
            <span className="hidden sm:inline">GH repo</span>
            <span className="text-(--on-bg-low) text-[10px]">·</span>
            <span className="font-mono text-[10px]">{starsDisplay} ⭐</span>
            <span className="hidden sm:block text-(--on-bg-low) text-[10px]">·</span>
            <span className="hidden sm:block text-[10px] font-mono text-(--on-bg-low)">Apache 2.0</span>
          </a>
        </Button>
      </Container>
    </header>
  );
}