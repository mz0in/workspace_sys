"use client";

import React from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";

import { Button } from "@/components/ui/button";

interface Props {
    provider: string;
}

export const OAuthLoginButton: React.FC<Props> = ({ provider }) => {
    return (
        <Button
            className="space-x-2"
            variant="outline"
            onClick={() => signIn(provider, { callbackUrl: "/", redirect: false })}
        >
            <Image src={`/${provider}.svg`} width={14} height={14} alt="" />
            <span>Login with {provider.charAt(0).toUpperCase() + provider.slice(1)}</span>
        </Button>
    );
};
