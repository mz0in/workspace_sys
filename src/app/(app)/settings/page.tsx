import React from "react";
import { redirect } from "next/navigation";

import { db } from "@/lib/database";
import { getCurrentUser } from "@/lib/get-current-user";
import { stripe } from "@/lib/stripe/stripe";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingInfo } from "@/components/billing/billing-info";
import { EditWorkspaceForm } from "@/components/edit-workspace-form";
import { PageHeader, PageTitle } from "@/components/layout/page-header";
import { WorkspaceSettings } from "@/components/layout/workspace-settings";
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

    return (
        <div className="flex flex-col px-[1rem] md:px-[2rem]">
            <PageHeader>
                <PageTitle>Settings</PageTitle>
            </PageHeader>
            <Tabs defaultValue="profile">
                <TabsList className="m-3">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="billing">Billing</TabsTrigger>
                    <TabsTrigger value="workspace">Workspace</TabsTrigger>
                </TabsList>
                <TabsContent value="profile" className="flex flex-col px-6 w-full">
                    <TabHeader title="Profile" description="Manage your profile information." />
                    { /* prettier-ignore */}
                    <UserSettingsForm 
                        user={{ id: user.id, name: user.name || "", email: user.email!, image: user.image || "" }} 
                    />
                    <UserDelete user={{ id: user.id, name: user.name || "" }} />
                </TabsContent>
                <TabsContent value="billing" className="flex flex-col px-6 w-full">
                    <TabHeader
                        title="Billing"
                        description="Manage your billing and subscriptions."
                    />
                    <BillingInfo subscription={subscription} isCanceled={isCanceled} />
                </TabsContent>
                <TabsContent value="workspace" className="flex flex-col px-6 w-full">
                    <TabHeader title="Workspace" description="Manage your personal workspace." />
                    <WorkspaceSettings user={user} />
                </TabsContent>
            </Tabs>
        </div>
    );
}

const TabHeader: React.FC<{ title: string; description: string }> = ({ description, title }) => (
    <div>
        <h1 className="text-foreground font-medium text-xl">{title}</h1>
        <h3 className="text-sm">{description}</h3>
        <Separator className="my-2" />
    </div>
);
