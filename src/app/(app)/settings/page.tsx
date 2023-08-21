import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { stripe } from "@/lib/stripe/stripe";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingInfo } from "@/components/billing/billing-info";
import { EditWorkspaceForm } from "@/components/layout/edit-workspace-form";
import { PageHeader, PageTitle } from "@/components/layout/page-header";
import { UserDelete } from "@/components/user-delete";
import { UserSettingsForm } from "@/components/user-settings-form";

export default async function Settings() {
    const user = await getCurrentUser();
    if (!user) {
        return redirect("/");
    }
    const subscription = await getUserSubscriptionPlan(user.id);
    let isCanceled = false;
    if (subscription.isPremium && subscription.stripeSubscriptionId) {
        const stripePlan = await stripe.subscriptions.retrieve(subscription.stripeSubscriptionId);
        isCanceled = stripePlan.cancel_at_period_end;
    }
    const workspace = await db.workspace.findFirst({
        where: { id: user.workspace! },
    });
    if (!workspace) {
        return redirect("/");
    }
    return (
        <div className="flex flex-col px-[1rem] md:px-[2rem]">
            <PageHeader>
                <PageTitle>Settings</PageTitle>
            </PageHeader>
            <Tabs defaultValue="profile">
                <TabsList className="m-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="workspace">Workspace</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="flex flex-col px-6 w-full">
                    <h1 className="text-foreground font-medium text-xl">Profile</h1>
                    <h3 className="text-sm">Manage your profile information.</h3>
                    <Separator className="my-2" />
                    { /* prettier-ignore */}
                    <UserSettingsForm 
                        user={{ id: user.id, name: user.name || "", email: user.email!, image: user.image || "" }} 
                    />
                    <UserDelete user={{ id: user.id, name: user.name || "" }} />
                </TabsContent>
                <TabsContent value="billing" className="flex flex-col px-6 w-full">
                    <h1 className="text-foreground font-medium text-xl">Billing</h1>
                    <h3 className="text-sm">Manage your billing and subscriptions.</h3>
                    <Separator className="my-2" />
                    <BillingInfo subscription={subscription} isCanceled={isCanceled} />
                </TabsContent>
                <TabsContent value="workspace" className="flex flex-col px-6 w-full">
                    <h1 className="text-foreground font-medium text-xl">Workspace</h1>
                    <h3 className="text-sm">Manage your workspace.</h3>
                    <Separator className="my-2" />
                    <EditWorkspaceForm workspace={workspace} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
