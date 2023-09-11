"use client";

import React from "react";

import { Loader } from "lucide-react";

import { Button } from "@/components/ui/button";

interface ButtonControlProps {
    prevStep?: string;
    nextStep?: string;
    updateStep: (next: string) => void;
    loading?: boolean;
}

export const ButtonControls: React.FC<ButtonControlProps> = ({
    prevStep,
    nextStep,
    updateStep,
    loading,
}) => {
    return (
        <div className="flex justify-end w-full pt-2 gap-2">
            {prevStep && (
                <Button
                    variant="outline"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        updateStep(prevStep);
                    }}
                >
                    Back
                </Button>
            )}
            {nextStep ? (
                <Button
                    variant="primary"
                    size="sm"
                    type="button"
                    onClick={(e) => {
                        e.preventDefault();
                        updateStep(nextStep);
                    }}
                >
                    Next
                </Button>
            ) : (
                <Button size="sm" type="submit" variant="primary" disabled={loading}>
                    {loading && <Loader className="mr-2 h-4 w-4 animate-spin" />}
                    Create
                </Button>
            )}
        </div>
    );
};
