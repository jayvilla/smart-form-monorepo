"use client";

import React from "react";
import { FieldInfo } from "./fieldRegistry";

interface Props {
  name: string;
  value: any;
  error?: string;
  info: FieldInfo;
  onChange: (value: any) => void;
}

export function InputField({ name, value, error, info, onChange }: Props) {
  const { type, label, placeholder } = info;

  if (type === "checkbox") {
    return (
      <label className="flex items-center gap-3 cursor-pointer">
        <input
          type="checkbox"
          checked={Boolean(value)}
          onChange={(e) => onChange(e.target.checked)}
          className="h-5 w-5 rounded border-gray-300 text-indigo-600"
        />
        <span className="text-sm text-gray-700">{label}</span>
      </label>
    );
  }

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-800">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-4 py-2 rounded-xl border border-gray-300 bg-white
          shadow-sm focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100
          transition-all
        "
      />

      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
    </div>
  );
}
