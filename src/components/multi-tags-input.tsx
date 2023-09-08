"use client";

import React, { useState, useEffect, useRef } from "react";

import { X } from "lucide-react";
import { FieldValues, UseFormReturn } from "react-hook-form";
import { z } from "zod";

import { FormDescription, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

interface Props<T extends FieldValues = any> {
    form: UseFormReturn<T>;
    name: string;
    labelText: string;
}
const tagClass = "flex items-center justify-between gap-2 rounded-md text-xs font-medium p-1 bg-neutral-200";

export const MultiTagsInput: React.FC<Props> = ({ form, name, labelText }) => {
    const ref = useRef<HTMLInputElement>(null);
    const [tags, setTags] = useState<string[]>(form.getValues(name));
    function handleKeyPress(e: React.KeyboardEvent<HTMLInputElement>) {
        const next = ref!.current!.value;
        if (e.key === "Tab" && next.length > 0 && !tags.includes(next)) {
            setTags([...tags, next]);
            ref!.current!.value = "";
            setTimeout(() => {
                ref!.current!.focus();
            }, 0);
        }
        if (e.key === "Backspace" && next.length === 0 && tags.length > 0) {
            handleRemove(tags[tags.length-1]);
        }
    }
    function handleRemove(tagToRemove: string) {
        setTags([...tags.filter(tag => tag !== tagToRemove)]);
    }
    useEffect(() => {
        // Update form value with the list of tags
        form.setValue(name, tags);
    }, [form, tags, name]);
    return (
        <FormItem>
            <FormLabel>{labelText}</FormLabel>
            <div className="flex flex-wrap border rounded-md">
                {tags.length > 0 && (
                    <ul className="flex items-center flex-wrap gap-1 p-1">
                        {tags.map((tag, i) => (
                            <li key={`tag-${i}`} className={tagClass}>
                                {tag}
                                <X className="w-3 h-3 cursor-pointer" onClick={() => handleRemove(tag)} />
                            </li>
                        ))}
                    </ul>
                )}
                <Input
                    ref={ref}
                    autoFocus={true}
                    className="border-0"
                    onKeyDown={handleKeyPress}
                />
            </div>
            <FormDescription>
                Separate items with a comma, or hit tab. To remove an item, press the X or
                backspace. 
            </FormDescription>
        </FormItem>
    );
};
