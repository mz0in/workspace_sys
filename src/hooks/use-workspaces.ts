import useSWR from "swr";

import type { Workspace } from "@prisma/client";

const fetcher = (url: string) => fetch(url, { method: "GET" }).then((res) => res.json());

export function useWorkspaces() {
    const { data: workspaces } = useSWR<Workspace[]>("/api/workspace", fetcher, {
        dedupingInterval: 3000,
    });
    return {
        workspaces: workspaces,
    };
}
