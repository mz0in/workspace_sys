import React from "react";

export default function WorkspaceDashboard({ params }: { params: { workspace: string } }) {
    return <div>{params.workspace}</div>;
}
