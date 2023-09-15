"use client";

import React from "react";

import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

interface Props {
    children: React.ReactNode;
    loading: boolean;
}

export function SubmitButton({ children, loading }: Props) {
    return (
        <Button type="submit" size="sm" disabled={loading}>
            {loading && <Loader className="w-4 h-4 mr-1 animate-spin" />}
            {children}
        </Button>
    );
}
