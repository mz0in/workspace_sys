import type { Metadata } from "next";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function absoluteUrl(path: string): string {
    return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

export function constructMetadata({
    title = "Workspace - Manage your projects in one spot",
    description = "Workspace is a way to manage your events, projects, and tasks while using AI to automate repetitive tasks",
    icons = "/favicon.ico",
}: {
    title?: string;
    description?: string;
    icons?: string;
} = {}): Metadata {
    return {
        title,
        description,
        icons,
        themeColor: "#FFF",
    };
}
