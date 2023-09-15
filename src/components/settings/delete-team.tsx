"use client";

import React from "react";

import type { Team } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { FormGroup, FormGroupTitle } from "@/components/ui/form";

interface Props {
    team: Pick<Team, "id" | "name">;
}

export function DeleteTeam({ team }: Props) {
    return (
        <FormGroup separate={false} className="w-1/2">
            <FormGroupTitle>Delete team</FormGroupTitle>
            <p className="text-sm text-zinc-500">
                <strong className="text-black">Warning:</strong> Deleting the team will also
                permanently delete all data associated with it. This action can&apos;t be undone and
                your data cannot be recovered.
            </p>
            <Button variant="danger" size="sm">
                Delete team
            </Button>
        </FormGroup>
    );
}
