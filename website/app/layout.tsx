import "./globals.css";
import type { Metadata } from "next";
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils";
import localFont from 'next/font/local'
import { ThemeProvider } from "@/providers/theme-provider";
import { LanguageProvider } from "@/providers/language-provider";
import UserProvider from "@/entities/user/model/user-context";
import ClientRootLayout from "./client-layout";

export const Geist = localFont({
  src: '../public/fonts/Geist-VariableFont_wght.woff2',
  variable: '--font-sans',
});

export const metadata: Metadata = {
  title: "Invest Tatarstan",
  description: "Make your morey work on you. We have 100+ programs for it!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(Geist.className, "font-sans")}
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
        <LanguageProvider>
          <ThemeProvider>
            <UserProvider>
              <TooltipProvider>
                <ClientRootLayout>
                  {children}
                </ClientRootLayout>
              </TooltipProvider>
            </UserProvider>
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
