// types/fieldConfig.ts

export interface BaseField {
    name: string;
    label: string;
    required?: boolean;
    defaultValue?: unknown;
    helperText?: string;
    disabled?: boolean;
    placeholder?: string;
    autoFocus?: boolean;
    fullWidth?: boolean;
}

export interface TextFieldConfig extends BaseField {
    type: "text" | "email" | "password" | "number" | "url" | "file";

}

export interface TextAreaFieldConfig extends BaseField {
    type: "textarea";
    rows?: number;
}

export interface SelectFieldConfig extends BaseField {
    type: "select";
    options: { value: string | number; label: string }[];
}

export interface CheckboxFieldConfig extends BaseField {
    type: "checkbox";

}

export interface RadioGroupFieldConfig extends BaseField {
    type: "radio";
    options: { value: string | number; label: string }[];
}


export type FieldConfig =
    | TextFieldConfig
    | TextAreaFieldConfig
    | SelectFieldConfig
    | CheckboxFieldConfig
    | RadioGroupFieldConfig; 