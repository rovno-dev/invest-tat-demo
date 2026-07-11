import "./globals.css";
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/providers/theme-provider";
import { WishlistProvider } from "@/providers/wishlist-provider";
import BottomAppBar from "@/components/layout/bottom-app-bar";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";

// Import your fonts
export const NotoSans = localFont({
  src: '../public/fonts/NotoSans.woff2',
  variable: '--font-sans',
});

export const Oswald = localFont({
  src: '../public/fonts/Oswald.woff2',
  variable: '--font-heading',
});

export const metadata: Metadata = {
  title: "Unidoka UI",
  description: "Framework-agnostic, AI-driven design system based on shadcn",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(NotoSans.className, "font-sans")}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'system';
                  var supportDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
                  if (theme === 'dark' || (theme === 'system' && supportDarkMode)) {
                    document.documentElement.classList.add('dark');
                  } else {
                    document.documentElement.classList.remove('dark');
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <WishlistProvider>
              <Header />
              <main className="pt-[56px] mb-[100px]">
                {children}
              </main>
              <Footer />
              {/* <BottomAppBar /> */}
            </WishlistProvider>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html >
  );
}
