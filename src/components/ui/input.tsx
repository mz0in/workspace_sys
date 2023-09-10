import * as React from "react";

import { cn } from "@/lib/utils";

const inputClass =
    "flex h-7 w-full rounded-md border border-input bg-background px-2 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    addPrefix?: React.ReactNode;
    addSuffix?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, addPrefix, addSuffix, ...props }, ref) => {
        if (addPrefix || addSuffix) {
            return (
                <div className="flex items-center h-7 w-full rounded-md text-sm border border-input space-x-1">
                    {addPrefix && (
                        <div className="flex h-7 p-1 border-r border-input bg-zinc-100">
                            {addPrefix}
                        </div>
                    )}
                    <input
                        type={type}
                        className={cn(inputClass, "h-6 border-none outline-none", className)}
                        ref={ref}
                        {...props}
                    />
                    {addSuffix && (
                        <div className="flex h-7 p-1 border-r border-input bg-zinc-100">
                            {addSuffix}
                        </div>
                    )}
                </div>
            );
        }
        return <input type={type} className={cn(inputClass, className)} ref={ref} {...props} />;
    },
);
Input.displayName = "Input";

export { Input };
