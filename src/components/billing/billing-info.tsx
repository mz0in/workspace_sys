"use client";

import React from "react";

import type { UserSubscriptionPlan } from "@/types";
import { CreditCard } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

interface Props {
    subscription: UserSubscriptionPlan;
    isCanceled: boolean;
}

export const BillingInfo: React.FC<Props> = ({ subscription, isCanceled }) => {
    const endDate = new Date(subscription.stripeCurrentPeriodEnd).toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
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
        <Card className="w-1/2 mt-4">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
                <CardTitle className="text-sm font-medium">Active Plan</CardTitle>
                <CreditCard className="w-5 h-5" />
            </CardHeader>
            <CardContent>
                <div className={cn("text-2xl font-bold")}>
                    {subscription.name}
                    <span className="font-medium text-sm text-black ms-2">
                        {subscription.price}
                    </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                    {!subscription.isPremium
                        ? subscription.desc
                        : isCanceled
                        ? `Your plan will be canceled on ${endDate}`
                        : `Your plan renews on ${endDate}`}
                </p>
            </CardContent>
            <CardFooter>
                <Button onClick={(e) => handleUpgrade(e)} size="sm">
                    {!subscription.isPremium ? "Upgrade to Premium" : "Manage Subscription"}
                </Button>
            </CardFooter>
        </Card>
    );
};
