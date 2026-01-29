import React, { useMemo } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../ui/FormInput";
import { PersonalFormData } from "../userFormField";
import { getErrorMessage } from "../../../utils/formHelpers";
import { useLanguage } from "../../../hooks/useLanguage";
const PersonalInfo: React.FC = () => {
  const { t } = useTranslation();
  const { language } = useLanguage();
  type Lang = "en" | "ar";

  const lang: Lang = language as Lang;

  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();
/**
 * moving the inline functions for input to  memo to
 * avoid unnecessary rerenders
 */
const processedFields = useMemo(() => {
  return PersonalFormData.map((row) =>
    row.map((field) => {
      const translatedLabel = t(field.label);
      const processedOptions = field.options?.map((o) => ({
        ...o,
        label: typeof o.label === "string" 
          ? t(o.label) 
          : (o.label[lang] || o.label.en || ""),
      }));

      return {
        ...field,
        translatedLabel,
        processedOptions,
      };
    })
  );
}, [t, lang]);

  return (
    <fieldset className="p-4">
      <legend className="text-sm sm:text-xl font-bold mb-4">
        {t("personalInfo.title")}
      </legend>

      <div className="flex flex-col gap-4">
        {processedFields.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid gap-4 ${row.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {row.map((field) => (
              <div key={field.name}>
                <label
                  htmlFor={field.name}
                  className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1"
                >
                  {t(`${field.label}`)}
                </label>
                <FormInput
                  name={field.name}
                  type={field.type}
                  options={field.processedOptions}
                  placeholderKey={field.translatedLabel}
                  register={register}
                  validation={field.validation}
                  error={getErrorMessage(errors, field.name, t)}
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </fieldset>
  );
};

export default PersonalInfo;
