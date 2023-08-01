import React from "react";
import { notFound } from "next/navigation";

import { getCurrentUser } from "@/lib/get-current-user";
import { Sidebar } from "@/components/layout/sidebar";
import { LockBodyScroll } from "@/components/lock-body-scroll";

interface Props {
    children: React.ReactNode;
}

export default async function AppLayout({ children }: Props) {
    const user = await getCurrentUser();
    if (!user) {
        return notFound();
    }
    return (
        <div className="flex min-h-screen">
            <Sidebar user={user} />
            <main className="grow">{children}</main>
            <LockBodyScroll />
        </div>
    );
}
