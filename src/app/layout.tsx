import * as React from "react";
import { Inter as FontSans } from "next/font/google";

import "@/styles/globals.css";

import { cn, constructMetadata } from "@/lib/utils";

const inter = FontSans({ subsets: ["latin"], variable: "--inter" });

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <body
                className={cn("min-h-screen bg-background text-foreground", inter.className)}
                suppressHydrationWarning={true}
            >
                {children}
            </body>
        </html>
    );
}
