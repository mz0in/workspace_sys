import type { UserSubscriptionPlan } from "@/types";

import { FREE_PLAN, PREMIUM_PLAN } from "@/config/plans";
import { db } from "@/lib/database";

const DAY_IN_MS = 86_400_000;

export async function getUserSubscriptionPlan(userId: string): Promise<UserSubscriptionPlan> {
    // prettier-ignore
    const user = await db.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            stripePriceId: true, stripeCurrentPeriodEnd: true, stripeCustomerId: true, stripeSubscriptionId: true,
        },
    });

    if (!user) {
        throw new Error("User does not exist.");
    }

    const isPremium =
        user.stripePriceId && user.stripeCurrentPeriodEnd?.getTime()
            ? user.stripeCurrentPeriodEnd.getTime() + DAY_IN_MS > Date.now()
            : false;

    const plan = isPremium ? PREMIUM_PLAN : FREE_PLAN;
    const userInfo = {
        stripeCustomerId: user.stripeCustomerId,
        stripeSubscriptionId: user.stripeSubscriptionId,
    };
    return {
        ...plan,
        ...userInfo,
        stripeCurrentPeriodEnd: user.stripeCurrentPeriodEnd?.getTime()!,
        isPremium,
    };
}
