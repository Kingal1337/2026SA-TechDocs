"use client"

import * as React from "react";
import { useFieldContext, useFormContext } from "@/components/form/form";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export type SelectFieldOption = {
    value: string;
    label: string;
};

export function SelectField({
    label,
    required,
    options,
    placeholder,
}: {
    label: string;
    required?: boolean;
    placeholder?: string;
    options: SelectFieldOption[];
}) {
    const field = useFieldContext<string>();
    const form = useFormContext();

    const [isFocused, setIsFocused] = React.useState(false);

    const showError =
        !field.state.meta.isValid &&
        (field.state.meta.isTouched || form.state.isSubmitting) &&
        (!isFocused);

    const selected = options.find((option) => option.value === field.state.value);
    const display = selected ? selected.label : placeholder ?? "Choose...";

    return (
        <Field data-invalid={showError}>
            <div className="grid gap-2">
                <FieldLabel htmlFor={field.name}>
                    {label}
                    {required && <span className="text-destructive">*</span>}
                </FieldLabel>

                <Select
                    value={field.state.value}
                    onValueChange={(value) => field.handleChange(value)}
                >
                    <SelectTrigger
                        id={field.name}
                        aria-invalid={showError}
                        className="w-full"
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => {
                            field.handleBlur();
                            setIsFocused(false);
                        }}
                    >
                        <SelectValue placeholder={display} />
                    </SelectTrigger>
                    <SelectContent>
                        {options.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                {showError && <FieldError errors={field.state.meta.errors} />}
            </div>
        </Field>
    );
}
