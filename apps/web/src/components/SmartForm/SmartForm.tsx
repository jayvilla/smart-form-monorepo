"use client";

import { useState } from "react";
import { buildFormMeta } from "./buildFormMeta";
import { InputField } from "./InputField";
import { UserFormSchema } from "@smart/schemas"; // imported directly
import { FieldMeta } from "./buildFormMeta";

export default function SmartForm({ onSubmit }) {
  const meta = buildFormMeta(UserFormSchema);

  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(path: string, value: any) {
    setValues((prev) => ({ ...prev, [path]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = UserFormSchema.safeParse(values);

    if (!result.success) {
      const errMap: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        errMap[issue.path.join(".")] = issue.message;
      });
      setErrors(errMap);
      return;
    }

    setErrors({});
    onSubmit(result.data);
  }

  function renderField(field: FieldMeta) {
    if (field.type === "group") {
      return (
        <div
          key={field.path}
          className="rounded-2xl border border-gray-200 bg-gray-50 p-5 space-y-4 shadow-sm"
        >
          <h3 className="text-lg font-semibold text-gray-800">{field.label}</h3>

          {field.children?.map(renderField)}
        </div>
      );
    }

    return (
      <InputField
        key={field.path}
        name={field.path}
        value={values[field.path]}
        error={errors[field.path]}
        info={field}
        onChange={(v) => handleChange(field.path, v)}
      />
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-xl">
      {meta.map(renderField)}

      <button
        className="
          w-full py-3 bg-indigo-600 text-white rounded-xl
          hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200
          transition-all shadow-sm font-medium
        "
      >
        Submit
      </button>
    </form>
  );
}
