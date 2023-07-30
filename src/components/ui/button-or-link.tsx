"use client";

import * as React from "react";
import Link from "next/link";

export type HTMLButtonProps = React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
>;

export type HTMLAnchorProps = React.DetailedHTMLProps<
    React.AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
>;

type ButtonOrLinkProps = HTMLButtonProps & HTMLAnchorProps;
export interface Props extends ButtonOrLinkProps {}

export const ButtonOrLink: React.FC<Props> = ({ href, ...props }) => {
    const isLink = typeof href !== "undefined";
    const ButtonOrLink = "button";

    let content = <ButtonOrLink {...props} />;

    if (isLink) {
        return <Link href={href}>{content}</Link>;
    }
    return content;
};
