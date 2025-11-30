import { ZodTypeAny } from "zod";

export type FieldInfo = {
  type: string;
  label: string;
  placeholder?: string;
};

export function decodeMeta(schema: ZodTypeAny): FieldInfo {
  // Metadata format:
  // "text|First Name|Enter name"
  const raw = schema.description;

  if (!raw) {
    return { type: "text", label: "Field" };
  }

  const [type, label, placeholder] = raw.split("|");

  return {
    type: type || "text",
    label: label || "Field",
    placeholder: placeholder || "",
  };
}
