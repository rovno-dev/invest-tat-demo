"use client";

import { Toaster } from "sonner";
import { useTheme} from "@/shared/providers/theme-provider";

export function ToasterProvider() {
    const { theme } = useTheme()

    return (
        <Toaster
            theme={theme as "light" | "dark" | "system"}
            position="top-right"
            richColors
        />
    );
}