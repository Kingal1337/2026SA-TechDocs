import { Button } from "@/components/ui/button";
import SetupCard from "@/components/setup/setup_card";
import { useAppForm } from "@/components/form/form";
import { BasicInfoSchema } from "@/lib/zod_schemas/profile_setup_schema";

type BasicInfoStepProps = {
    form: ReturnType<typeof useAppForm>;
    onNext: () => void;
};

export default function BasicInfoStep({
    form,
    onNext,
}: BasicInfoStepProps) {
    const validateAndContinue = async () => {
        const result = await form.validateAllFields("submit");

        if (result.length == 0) {
            onNext();
        }
    };

    return (
        <SetupCard
            title="Basic Information"
            description="Tell us a little about yourself."
            footer={
                <div className="w-full flex justify-end">
                    <Button type="button" onClick={validateAndContinue}>
                        Continue
                    </Button>
                </div>
            }
        >
            <div className="space-y-4">
                <form.AppField
                    name="weight"
                    validators={{
                        onBlur: BasicInfoSchema.shape.weight
                    }}
                    children={(field) =>
                        <field.NumberField
                            label="Weight"
                            placeholder="Enter your weight"
                            required
                        />
                    }
                />
                <form.AppField
                    name="height"
                    validators={{
                        onBlur: BasicInfoSchema.shape.height
                    }}
                    children={(field) =>
                        <field.NumberField
                            label="Height"
                            placeholder="Enter your height"
                            required
                        />
                    }
                />
                <form.AppField
                    name="dob"
                    validators={{
                        onBlur: BasicInfoSchema.shape.dob
                    }}
                    children={(field) =>
                        <field.DateField
                            label="Date of Birth"
                            calendarProps={{
                                disabled: { after: new Date() }
                            }}
                            required
                        />
                    }
                />
                <form.AppField
                    name="occupation"
                    validators={{
                        onBlur: BasicInfoSchema.shape.occupation
                    }}
                    children={(field) =>
                        <field.TextField
                            label="Occupation"
                            placeholder="Enter your occupation"
                            required
                        />
                    }
                />
                <form.AppField
                    name="timezone"
                    validators={{
                        onBlur: BasicInfoSchema.shape.timezone
                    }}
                    children={(field) =>
                        <field.SelectField
                            label="Timezone"
                            placeholder="Enter your timezone"
                            options={[
                                { label: "America/New_York", value: "America/New_York" },
                                { label: "America/Chicago", value: "America/Chicago" },
                                { label: "America/Denver", value: "America/Denver" },
                                { label: "America/Los_Angeles", value: "America/Los_Angeles" },
                                { label: "Europe/London", value: "Europe/London" },
                                { label: "Asia/Tokyo", value: "Asia/Tokyo" },
                            ]
                            }
                            required
                        />
                    }
                />
                <form.AppField
                    name="allergies"
                    // validators={{
                    //     onBlur: BasicInfoSchema.shape.allergies
                    // }}
                    children={(field) =>
                        <field.MultiSelectField
                            label="Allergies"
                            options={[
                                { value: "peanuts", label: "Peanuts" },
                                { value: "tree_nuts", label: "Tree Nuts" },
                                { value: "dairy", label: "Dairy" },
                                { value: "eggs", label: "Eggs" },
                                { value: "wheat", label: "Wheat" },
                                { value: "soy", label: "Soy" },
                                { value: "fish", label: "Fish" },
                                { value: "shellfish", label: "Shellfish" },
                            ]}
                            placeholder="Select your allergies..."
                        />
                    }
                />
                <form.AppField
                    name="dietary"
                    // validators={{
                    //     onBlur: BasicInfoSchema.shape.allergies
                    // }}
                    children={(field) =>
                        <field.MultiSelectField
                            label="Dietary Preferences"
                            options={[
                                { value: "vegetarian", label: "Vegetarian" },
                                { value: "vegan", label: "Vegan" },
                                { value: "halal", label: "Halal" },
                                { value: "kosher", label: "Kosher" },
                                { value: "gluten_free", label: "Gluten-Free" },
                                { value: "lactose_free", label: "Lactose-Free" },
                                { value: "low_carb", label: "Low-Carb" },
                            ]}
                            placeholder="Select your dietary preferences..."
                        />
                    }
                />
            </div>
        </SetupCard>
    );
}