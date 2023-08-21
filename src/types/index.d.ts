import type { User, Workspace } from "@prisma/client";

export type SubscriptionPlan = {
    name: string;
    desc: string;
    stripePriceId?: string;
    price: string;
};

export type UserSubscriptionPlan = SubscriptionPlan &
    Pick<User, "stripeCustomerId" | "stripeSubscriptionId"> & {
        stripeCurrentPeriodEnd: number;
        isPremium: boolean;
    };

export type UserWithWorkspaces = User & Workspace[];
