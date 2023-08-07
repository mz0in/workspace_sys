import React from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";
import { getUserSubscriptionPlan } from "@/lib/stripe/subscription";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BillingForm } from "@/components/billing-form";
import { PageHeader, PageTitle } from "@/components/layout/page-header";
import { UserDelete } from "@/components/user-delete";
import { UserSettingsForm } from "@/components/user-settings-form";

export default async function Settings() {
    const user = await getCurrentUser();
    if (!user) {
        return redirect("/");
    }
    const subscription = await getUserSubscriptionPlan(user.id);
    return (
        <div className="flex flex-col px-[1rem] md:px-[2rem]">
            <PageHeader>
                <PageTitle>Settings</PageTitle>
            </PageHeader>
            <Tabs defaultValue="profile">
                <TabsList className="mx-4 my-2">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="subscription">Subscription</TabsTrigger>
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
                <TabsContent value="subscription" className="flex flex-col px-6 w-full">
                    <h1 className="text-foreground font-medium text-xl">Subscription</h1>
                    <h3 className="text-sm">Manage your billing and subscriptions.</h3>
                    <Separator className="my-2" />
                    <BillingForm subscription={subscription} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
