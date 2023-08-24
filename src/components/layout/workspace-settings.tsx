import React from "react";
import { redirect } from "next/navigation";

import type { WorkspaceWithUser } from "@/types";
import type { User } from "next-auth";

import { db } from "@/lib/database";
import { columns } from "@/components/data-tables/workspace-member-table/columns";
import { MemberTable } from "@/components/data-tables/workspace-member-table/member-table";
import { EditWorkspaceForm } from "@/components/edit-workspace-form";

interface Props {
    user: User;
}

export const WorkspaceSettings: React.FC<Props> = async ({ user }) => {
    const workspace = await db.workspace.findFirst({
        where: {
            id: user.workspace!,
        },
        include: {
            members: {
                include: {
                    user: {
                        select: {
                            name: true,
                            email: true,
                            image: true,
                        },
                    },
                },
            },
        },
    });
    if (!workspace) {
        return redirect("/");
    }
    // prettier-ignore
    return (
        <div className="space-y-4">
            <EditWorkspaceForm
                workspace={{
                    id: workspace.id, name: workspace.name, type: workspace.type, color: workspace.color,
                }}
            />
            <MemberTable
                columns={columns}
                data={workspace.members.map((member) => {
                    return { ...member, name: member.user.name ?? "", email: member.user.email, image: member.user.image ?? "" };
                })}
            />
        </div>
    );
};
