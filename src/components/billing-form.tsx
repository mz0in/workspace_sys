"use client";

import React from "react";

import type { UserSubscriptionPlan } from "@/types";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface Props {
    subscription: UserSubscriptionPlan;
    isCanceled: boolean;
}

export const BillingForm: React.FC<Props> = ({ subscription, isCanceled }) => {
    async function handleUpgrade(e: React.MouseEvent) {
        e.preventDefault();
        // get the stripe session url
        const response = await fetch("/api/user/stripe");
        if (!response?.ok) {
            toast({
                title: "Something went wrong.",
                description: "Please refresh the page and try again.",
            });
        }
        const stripeSession = await response.json();
        if (stripeSession) {
            window.location.href = stripeSession.url;
        }
    }
    return (
        <Alert className="flex justify-between mt-2 space-y-1 bg-[#F2FBFE] border border-[#A9DEFE]">
            <div className="flex flex-col">
                <AlertTitle>
                    You are currently on the{" "}
                    <span className="underline underline-offset-4">{subscription.name}</span> plan
                </AlertTitle>
                <AlertDescription className="text-md">
                    {subscription.isPremium ? (
                        <p>
                            {isCanceled ? "Your plan will be canceled on " : "Your plan renews on "}
                            <span className="font-medium">
                                {new Date(subscription.stripeCurrentPeriodEnd).toLocaleDateString(
                                    "en-US",
                                    { month: "long", day: "numeric", year: "numeric" },
                                )}.
                            </span>
                        </p>
                    ) : (
                        subscription.desc
                    )}
                </AlertDescription>
            </div>
            <Button onClick={(e) => handleUpgrade(e)} size="sm">
                {!subscription.isPremium ? "Upgrade to Premium" : "Manage Subscription"}
            </Button>
        </Alert>
    );
};
