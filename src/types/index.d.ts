import type { User } from "@prisma/client";

export type SubscriptionPlan = {
    name: string;
    desc: string;
    stripePriceId?: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
        stripeCurrentPeriodEnd: number;
        isPremium: boolean;
    };
