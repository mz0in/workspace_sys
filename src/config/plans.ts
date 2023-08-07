import type { SubscriptionPlan } from "@/types";

export const FREE_PLAN: SubscriptionPlan = {
    name: "Free",
    desc: "The free plan offers all basic features for individuals.",
    stripePriceId: "",
};

export const PREMIUM_PLAN: SubscriptionPlan = {
    name: "Premium",
    desc: "Get access to all features for individuals and teams.",
    stripePriceId: process.env.PREMIUM_PLAN_PRICE_ID || "",
};
