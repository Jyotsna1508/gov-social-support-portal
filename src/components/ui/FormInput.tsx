import { useCallback } from "react";
import type { FormInputProps } from "../../types/form";
import React from "react";

const FormInputComponent = ({
  name,
  placeholderKey,
  type = "text",
  options,
  rows = 3,
  register,
  validation,
  error,
}: FormInputProps) => {
  const borderClass = error ? "border-red-500" : "border-gray-200";
  const baseInputClasses = `
    w-full
    p-2
    rounded-lg
    border ${borderClass}
    text-xs sm:text-sm
    placeholder:text-xs sm:placeholder:text-sm 
    shadow-sm
    focus:outline-none
    focus:ring-1 focus:ring-blue-400 focus:border-blue-400
    transition duration-200
  `;

   // Memoized event handler to prevent recreation on each render
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (type === "number" && e.key === "-") e.preventDefault();
    },
    [type]
  );

  if (type === "select") {
    return (
      <div>
        <select {...register(name, validation)} aria-invalid={!!error} aria-describedby={error ? `${name}-error` : undefined}
         className={`${baseInputClasses} pr-8 h-10.5`}
        >
          <option value="">{placeholderKey}</option>
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </div>
    );
  }

 return (
  <div>
    {type === "textarea" ? (
      <textarea
        {...register(name, validation)}
        placeholder={placeholderKey}
        rows={rows || 3}
        className={baseInputClasses}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
      />
    ) : (
      <input
        type={type}
        {...register(name, validation)}
        placeholder={placeholderKey}
         className={`${baseInputClasses} [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-moz-appearance]:textfield`}
        aria-invalid={!!error}
        aria-describedby={error ? `${name}-error` : undefined}
        onKeyDown={handleKeyDown}
      />
    )}

    {error && <p className="text-red-500 text-sm" role="alert">{error}</p>}
  </div>
);
};

const FormInput = React.memo(FormInputComponent);
export default FormInput;