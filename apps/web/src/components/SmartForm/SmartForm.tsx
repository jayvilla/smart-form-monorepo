"use client";

import { useState } from "react";
import { buildFormMeta } from "./buildFormMeta";
import { InputField } from "./InputField";
import { FieldMeta } from "./buildFormMeta";
import { UserFormSchema } from "@smart/schemas";

export default function SmartForm() {
  const meta = buildFormMeta(UserFormSchema);

  const [values, setValues] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  function handleChange(path: string, value: any) {
    setValues((prev) => ({ ...prev, [path]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    // 1. Client-side validation
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

    // 2. Send to backend
    const res = await fetch("http://localhost:8000/user-form", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    if (!res.ok) {
      // 3. server errors
      const data = await res.json();

      const serverErrMap: Record<string, string> = {};
      data.errors?.forEach((err: any) => {
        serverErrMap[err.path] = err.message;
      });

      setErrors(serverErrMap);
      return;
    }

    const json = await res.json();
    console.log("Success:", json);
    alert("Form submitted successfully!");
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
