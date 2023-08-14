import type { User, WorkspaceUser } from "@prisma/client";

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

export type WorkspaceWithUserInfo = Workspace & Pick<WorkspaceUser, "role">;
