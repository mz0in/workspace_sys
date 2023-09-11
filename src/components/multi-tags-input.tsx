"use client";

import React, { useEffect, useRef, useState } from "react";

import { X } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";

import { cn } from "@/lib/utils";
import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues = any> {
    form: UseFormReturn<T>;
    name: string;
    labelText: string;
    error: boolean;
    errorMsg: string;
}
const tagClass =
    "flex items-center justify-between gap-2 rounded-md text-xs font-medium p-1 bg-neutral-200";

export const MultiTagsInput: React.FC<Props> = ({ form, name, labelText, error, errorMsg }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>(form.getValues(name));
    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        if (e.key === "Enter") {
            e.preventDefault();
        }
        const next = ref!.current!.value;
        if (e.key === "Tab" && next.length > 0) {
            if (!tags.includes(next)) {
                // Only add new tags if the value does not already exist
                setTags([...tags, next]);
            }
            ref!.current!.value = "";
            setTimeout(() => {
                ref!.current!.focus();
            }, 0);
        }
        if (e.key === "Backspace" && next.length === 0 && tags.length > 0) {
            handleRemove(tags[tags.length - 1]);
        }
    }
    function handleRemove(tagToRemove: string) {
        setTags([...tags.filter((tag) => tag !== tagToRemove)]);
    }
    useEffect(() => {
        // Update form value with the list of tags
        form.setValue(name, tags);
    }, [form, tags, name]);
    return (
        <FormItem>
            <FormLabel className={cn(error && "font-medium text-destructive")}>
                {labelText}
            </FormLabel>
            <div className="flex flex-wrap border rounded-md">
                {tags.length > 0 && (
                    <ul className="flex items-center flex-wrap gap-1 p-1">
                        {tags.map((tag, i) => (
                            <li key={`tag-${i}`} className={tagClass}>
                                {tag}
                                <X
                                    className="w-3 h-3 cursor-pointer"
                                    onClick={() => handleRemove(tag)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
                <Input ref={ref} autoFocus={true} className="border-0" onKeyDown={handleKeyPress} />
            </div>
            {error && <p className="text-[0.8rem] font-medium text-destructive">{errorMsg}</p>}
            <FormDescription>
                Separate items with a comma, or hit tab. To remove an item, click the X or press
                backspace.
            </FormDescription>
        </FormItem>
    );
};
