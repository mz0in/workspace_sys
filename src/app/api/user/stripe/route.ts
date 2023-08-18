import { PREMIUM_PLAN } from "@/config/plans";
import { getCurrentUser } from "@/lib/get-current-user";
import { stripe } from "@/lib/stripe/stripe";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { absoluteUrl } from "@/lib/utils";

const subscriptionUrl = absoluteUrl("/settings");

export async function GET(req: Request) {
    try {
        const user = await getCurrentUser();
        if (!user || !user.email) {
            return new Response(null, { status: 403 });
        }
        const subscription = await getUserSubscriptionPlan(user.id);

        // if the user is already a premium subscriber, redirect to billing management
        if (subscription.isPremium && subscription.stripeCustomerId) {
            const stripeSession = await stripe.billingPortal.sessions.create({
                customer: subscription.stripeCustomerId,
                return_url: subscriptionUrl,
            });
            return new Response(JSON.stringify({ url: stripeSession.url }));
        }
        // if the user is on the free plan, redirect to the stripe upgrade page
        // prettier-ignore
        const stripeSession = await stripe.checkout.sessions.create({
            success_url: subscriptionUrl,
            cancel_url:  subscriptionUrl,
            payment_method_types: ["card"],
            mode: "subscription",
            billing_address_collection: "auto",
            customer_email: user.email,
            line_items: [
                {
                    price: PREMIUM_PLAN.stripePriceId,
                    quantity: 1,
                },
            ],
            metadata: {
                userId: user.id,
            },
        });
        return new Response(JSON.stringify({ url: stripeSession.url }));
    } catch (error) {
        return new Response(null, { status: 500 });
    }
}
