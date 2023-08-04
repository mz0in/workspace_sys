"use client";

import React from "react";

import { cn } from "@/lib/utils";
import { ButtonOrLink, Props } from "@/components/ui/button-or-link";

type BUTTON_SIZE = "sm" | "md" | "lg";
type BUTTON_VARIANT = "primary" | "outline" | "ghost" | "danger" | "none";

export type ButtonThemeProps = {
    size?: BUTTON_SIZE;
    variant?: BUTTON_VARIANT;
};

export const classes = {
    base: "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50",
    size: {
        sm: "h-8 rounded-md px-3 text-xs",
        md: "h-9 px-4 py-2",
        lg: "h-10 rounded-md px-8",
    },
    variant: {
        primary: "bg-red-500 text-white hover:bg-red-600",
        ghost: "hover:bg-accent hover:text-foreground",
        outline:
            "border border-input bg-background shadow-sm hover:bg-accent hover:text-foreground",
        danger: "bg-destructive text-white hover:bg-destructive/90",
        none: "",
    },
};

export function getButtonClasses(
    style: { size?: BUTTON_SIZE; variant?: BUTTON_VARIANT },
    ...rest: string[]
) {
    const { size = "md", variant = "primary" } = style;
    return cn(classes["base"], classes["size"][size], classes["variant"][variant], ...rest);
}

export type ButtonProps = ButtonThemeProps & Props;
export const Button: React.FC<ButtonProps> = ({
    size = "md",
    variant = "primary",
    className = "",
    disabled = false,
    children,
    ...props
}) => {
    return (
        <ButtonOrLink
            className={getButtonClasses({ size, variant }, className)}
            disabled={disabled}
            {...props}
        >
            {children}
        </ButtonOrLink>
    );
};
