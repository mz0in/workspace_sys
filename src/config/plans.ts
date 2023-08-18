import type { SubscriptionPlan } from "@/types";

export const FREE_PLAN: SubscriptionPlan = {
    name: "Basic",
    desc: "Premium plans offer more of the features you love like workspaces, todolists, automated workflows, and more.",
    stripePriceId: "",
    price: "Free",
};

export const PREMIUM_PLAN: SubscriptionPlan = {
    name: "Premium",
    desc: "Get access to all features for individuals and teams.",
    stripePriceId: process.env.PREMIUM_PLAN_PRICE_ID || "",
    price: "$14.99/mo",
};
