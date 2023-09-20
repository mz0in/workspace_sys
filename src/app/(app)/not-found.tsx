import React from "react";
import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex flex-col mt-64 font-bold text-center">
            404: Page Not Found{" "}
            <Link href="/" className="text-blue-500 font-medium underline underline-offset-2">
                Back to Content
            </Link>
        </div>
    );
}
