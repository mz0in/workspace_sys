"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

interface Props {
    children: React.ReactNode;
    href: string;
    className?: string;
}

const SidebarItem: React.FC<Props> = ({ href, className = "", children }) => {
    const routerPath = usePathname();
    return (
        <Link
            href={href}
            className={cn(
                "flex items-center space-x-2 w-full px-2 py-1 text-sm font-medium cursor-pointer rounded-md",
                routerPath === href
                    ? "bg-[#F3F5F6] text-black"
                    : "text-[#4B5155] hover:bg-[#F3F5F6] hover:text-black",
                className,
            )}
        >
            {children}
        </Link>
    );
};
SidebarItem.displayName = "SidebarItem";

export { SidebarItem };
