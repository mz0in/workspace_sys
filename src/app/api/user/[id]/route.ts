import * as z from "zod";

import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { stripe } from "@/lib/stripe/stripe";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { editUserSchema } from "@/lib/validators/user";

const routeCtxSchema = z.object({
    params: z.object({ id: z.string().cuid() }),
});

export async function DELETE(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        // validate route context
        const { params } = routeCtxSchema.parse(ctx);

        // validate a user is logged in and that the user is the same as the context
        const user = await getCurrentUser();
        if (!user || user.id !== params.id) {
            return new Response("Unauthorized", { status: 403 });
        }
        const subscription = await getUserSubscriptionPlan(user.id);
        if (subscription.isPremium && subscription.stripeSubscriptionId) {
            await stripe.subscriptions.update(subscription.stripeSubscriptionId, {
                cancel_at_period_end: true,
            });
        }
        await db.user.delete({ where: { id: params.id } });
        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}

export async function PATCH(req: Request, ctx: z.infer<typeof routeCtxSchema>) {
    try {
        // validate route context
        const { params } = routeCtxSchema.parse(ctx);

        // validate a user is logged in and that the user is the same as the context
        const user = await getCurrentUser();
        if (!user || user.id !== params.id) {
            return new Response("Unauthorized", { status: 403 });
        }
        const body = await req.json();
        const payload = editUserSchema.parse(body);

        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                name: payload.name,
            },
        });
        return new Response(null, { status: 200 });
    } catch (error) {
        if (error instanceof z.ZodError) {
            return new Response(JSON.stringify(error.issues), { status: 422 });
        }
        return new Response("Internal Server Error", { status: 500 });
    }
}
