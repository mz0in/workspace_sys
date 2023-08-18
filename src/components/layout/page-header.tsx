import React from "react";

import { cn } from "@/lib/utils";

const PageHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, children, ...props }, ref) => (
        <section
            ref={ref}
            className={cn(
                "flex max-w-[980px] flex-col items-start gap-2 px-4 pt-6 md:pt-4",
                className,
            )}
            {...props}
        >
            {children}
        </section>
    ),
);
PageHeader.displayName = "PageHeader";

const PageTitle = React.forwardRef<HTMLHeadingElement, React.HTMLAttributes<HTMLHeadingElement>>(
    ({ className, ...props }, ref) => (
        <h1
            ref={ref}
            className={cn(
                "text-2xl font-bold leading-tight tracking-tighter md:text-3xl lg:leading-[1.1]",
                className,
            )}
            {...props}
        />
    ),
);
PageTitle.displayName = "PageTitle";

const PageDescription = React.forwardRef<
    HTMLHeadingElement,
    React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
    <h3
        ref={ref}
        className={cn("max-w-[750px] text-lg text-muted-foreground sm:text-lg", className)}
        {...props}
    />
));
PageDescription.displayName = "PageDescription";

export { PageHeader, PageTitle, PageDescription };
