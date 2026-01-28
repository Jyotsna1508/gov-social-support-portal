import type { FormInputProps } from "../../types/form";

const FormInput = ({
  name,
  placeholderKey,
  type = "text",
  options,
  register,
  validation,
  error,
}: FormInputProps) => {
  const borderClass = error ? "border-red-500" : "border-gray-300";
  if (type === "select") {
    return (
      <div>
        <select {...register(name, validation)}  className={`p-2 rounded border ${borderClass} w-full`}>
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
      <input
        type={type}
        {...register(name, validation)}
        placeholder={placeholderKey}
       className={`p-2 rounded border ${borderClass} w-full`}
      />
      {error && <p className="text-red-500 text-sm">{error}</p>}
    </div>
  );
};

export default FormInput;
