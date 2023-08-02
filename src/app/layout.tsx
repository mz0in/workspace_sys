import * as React from "react";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";

import "@/globals.css";

import { cn, constructMetadata } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";

const int = Inter({ subsets: ["latin"], variable: "--inter" });
const cal = LocalFont({
    src: "../../public/fonts/CalSans-SemiBold.ttf",
    variable: "--font-calsans",
});

export const metadata = constructMetadata();
interface Props {
    children: React.ReactNode;
}

export default function RootLayout({ children }: Props) {
    return (
        <html lang="en">
            <head />
            <body className={cn(int.className, cal.variable)} suppressHydrationWarning={true}>
                {children}
                <Toaster />
            </body>
        </html>
    );
}
