import type { TeamMembership, User, Workspace, WorkspaceMembership } from "@prisma/client";

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

// TODO: Refactor this.
export type TeamWithMetadata = TeamMembership & {
    team: Team & {
        members: User[];
        ownedWorkspaces: Workspace[];
    };
};

export type WorkspaceWithUser = WorkspaceMembership & {
    email: string;
    name?: string;
    image?: string;
};
