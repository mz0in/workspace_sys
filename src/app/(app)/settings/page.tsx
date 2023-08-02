import React from "react";
import { redirect } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader, PageTitle } from "@/components/layout/page-header";
import { UserSettingsForm } from "@/components/user-settings-form";

export default async function Settings() {
    const user = await getCurrentUser();
    if (!user) {
        return redirect("/");
    }
    return (
        <div className="flex flex-col space-y-2 px-[1rem] md:px-[2rem]">
            <PageHeader>
                <PageTitle>Settings</PageTitle>
            </PageHeader>
            <Tabs defaultValue="profile">
                <TabsList className="mx-4">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="preferences">Preferences</TabsTrigger>
                </TabsList>
                <TabsContent value="profile">
                    <UserSettingsForm user={{ id: user.id, name: user.name || "" }} />
                </TabsContent>
            </Tabs>
        </div>
    );
}
