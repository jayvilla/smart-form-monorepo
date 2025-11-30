import { ZodObject, ZodRawShape, ZodTypeAny } from "zod";
import { decodeMeta } from "./fieldRegistry";

export type FieldMeta = {
  path: string;
  type: string;
  label: string;
  placeholder?: string;
  children?: FieldMeta[];
};

export function buildFormMeta<T extends ZodObject<ZodRawShape>>(schema: T) {
  const shape = schema.shape;

  function walk(path: string, zodType: ZodTypeAny): FieldMeta {
    const def = zodType._def;
    const meta = decodeMeta(zodType);

    if (def.typeName === "ZodObject") {
      // Nested group
      const subShape = (zodType as any).shape;

      return {
        path,
        type: "group",
        label: meta.label,
        children: Object.entries(subShape).map(([subKey, subDef]) =>
          walk(`${path}.${subKey}`, subDef)
        ),
      };
    }

    return {
      path,
      type: meta.type,
      label: meta.label,
      placeholder: meta.placeholder,
    };
  }

  return Object.entries(shape).map(([key, field]) => walk(key, field));
}
