"use client"

import { DateField } from "@/components/form/date_field";
import { EmailField } from "@/components/form/email_field";
import { NumberField } from "@/components/form/number_field";
import { PasswordField } from "@/components/form/password_field";
import { SubmitButton } from "@/components/form/submit_button";
import { TextField } from "@/components/form/text_field";
import { MultiSelectField } from "@/components/form/multi_select_field";
import { createFormHook, createFormHookContexts } from "@tanstack/react-form";
import { SelectField } from "@/components/form/select_field";

export const { fieldContext, formContext, useFieldContext, useFormContext } =
    createFormHookContexts()

export const { useAppForm } = createFormHook({
    fieldContext,
    formContext,
    fieldComponents: {
        TextField,
        EmailField,
        PasswordField,
        DateField,
        NumberField,
        SelectField,
        MultiSelectField,
    },
    formComponents: {
        SubmitButton
    },
})