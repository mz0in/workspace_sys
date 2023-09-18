"use client";

import React from "react";

import { Button } from "@/components/ui/button";
import { SubmitButton } from "@/components/ui/submit-button";

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
                <SubmitButton loading={loading ?? false}>Create</SubmitButton>
            )}
        </div>
    );
};
