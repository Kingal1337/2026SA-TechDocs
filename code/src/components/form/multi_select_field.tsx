"use client"

import * as React from "react";
import { useFieldContext, useFormContext } from "@/components/form/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Badge } from "@/components/ui/badge";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuCheckboxItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, X } from "lucide-react";

export type MultiSelectFieldOption = {
    value: string;
    label: string;
};

export function MultiSelectField({
    label,
    required,
    options,
    placeholder,
}: {
    label: string;
    required?: boolean;
    placeholder?: string;
    options: MultiSelectFieldOption[];
}) {
    const field = useFieldContext<string[]>();
    const form = useFormContext();

    const [open, setOpen] = React.useState(false);
    const showError =
        !field.state.meta.isValid &&
        (field.state.meta.isTouched || form.state.isSubmitting) &&
        !open;

    const selectedValues = field.state.value || [];
    const selectedOptions = options.filter((option) => selectedValues.includes(option.value));

    const toggleValue = (value: string) => {
        const exists = selectedValues.includes(value);
        const next = exists
            ? selectedValues.filter((v) => v !== value)
            : [...selectedValues, value];
        field.handleChange(next);
    };

    return (
        <Field data-invalid={showError}>
            <div className="grid gap-2">
                <FieldLabel htmlFor={field.name}>
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </FieldLabel>

                <DropdownMenu
                    open={open}
                    onOpenChange={(next) => {
                        setOpen(next);
                        if (!next) {
                            field.handleBlur();
                        }
                    }}
                >
                    <DropdownMenuTrigger asChild>
                        <div
                            id={field.name}
                            data-field-name={field.name}
                            role="button"
                            tabIndex={0}
                            className="inline-flex w-full flex-nowrap gap-2 items-center rounded-md border border-input 
                            bg-transparent px-3 py-2 text-sm shadow-x min-h-[2.5rem] hover:bg-accent hover:cursor-pointer 
                            data-[invalid=true]:border-destructive aria-invalid:border-destructive"
                            aria-invalid={showError}
                        >
                            <span className="flex flex-1 flex-wrap items-center gap-2">
                                {selectedOptions.length > 0 ? (
                                    selectedOptions.map((option) => (
                                        <Badge
                                            key={option.value}
                                            variant="secondary"
                                            className="flex cursor-pointer items-center gap-1"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                event.preventDefault();
                                                toggleValue(option.value);
                                            }}
                                            onPointerDown={(event) => {
                                                event.stopPropagation();
                                            }}
                                        >
                                            {option.label} <X />
                                        </Badge>
                                    ))
                                ) : (
                                    <span className="flex-1 text-muted-foreground">
                                        {placeholder ?? "Select..."}
                                    </span>
                                )}
                            </span>
                            <ChevronDown className="size-4" />
                        </div>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="start">
                        {options.map((option) => (
                            <DropdownMenuCheckboxItem
                                key={option.value}
                                onSelect={(event) => {
                                    event.preventDefault();
                                }}
                                checked={selectedValues.includes(option.value)}
                                onCheckedChange={() => toggleValue(option.value)}
                            >
                                {option.label}
                            </DropdownMenuCheckboxItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {showError && <FieldError errors={field.state.meta.errors} />}
            </div>
        </Field>
    );
}
