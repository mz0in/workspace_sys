import React from "react";

import { getCurrentUser } from "@/lib/get-current-user";

export default async function Inbox() {
    const user = await getCurrentUser();
    // return <pre>{JSON.stringify(user, null, 2)}</pre>;
    return <div></div>;
}
