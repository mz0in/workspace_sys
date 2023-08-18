import { headers } from "next/headers";

import Stripe from "stripe";

import { db } from "@/lib/database";
import { stripe } from "@/lib/stripe/stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
    } catch (error: any) {
        return new Response(`Webhook Error: ${error.message}`, { status: 400 });
    }
    const stripeSession = event.data.object as Stripe.Checkout.Session;
    if (event.type === "checkout.session.completed") {
        const subscription = await stripe.subscriptions.retrieve(
            stripeSession.subscription as string,
        );
        await db.user.update({
            where: {
                id: stripeSession?.metadata?.userId,
            },
            data: {
                stripeSubscriptionId: subscription.id,
                stripeCustomerId: subscription.customer as string,
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }
    if (event.type === "invoice.payment_succeeded") {
        const subscription = await stripe.subscriptions.retrieve(
            stripeSession.subscription as string,
        );
        await db.user.update({
            where: {
                stripeSubscriptionId: subscription.id,
            },
            data: {
                stripePriceId: subscription.items.data[0].price.id,
                stripeCurrentPeriodEnd: new Date(subscription.current_period_end * 1000),
            },
        });
    }
    return new Response(null, { status: 200 });
}
