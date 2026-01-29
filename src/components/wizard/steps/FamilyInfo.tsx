import React, { useMemo } from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../ui/FormInput";
import { FamilyFormData } from "../userFormField";
import { getErrorMessage } from "../../../utils/formHelpers";

const FamilyInfo: React.FC = () => {
  const { t } = useTranslation();
  const {
    register,
    formState: { errors },
  } = useFormContext<FieldValues>();
  /**
 * moving the inline functions for input to  memo to
 * avoid unnecessary rerenders
 */
   const optimizedFieldRows = useMemo(() => {
    return FamilyFormData.map(row => 
      row.map(field => ({
        ...field,
        translatedOptions: field.options?.map(opt => ({
          ...opt,
          label: t(opt.label)
        }))
      }))
    );
  }, [t]);
  return (
    <fieldset className="p-4">
      <legend className="text-sm sm:text-xl font-bold mb-4">{t("familyInfo.title")}</legend>

      <div className="flex flex-col gap-4">
        {optimizedFieldRows.map((row, rowIndex) => (
          <div
            key={rowIndex}
            className={`grid gap-4 ${row.length === 1 ? "grid-cols-1" : "grid-cols-2"}`}
          >
            {row.map((field) => (
              <div key={field.name}>
                <label htmlFor={field.name} className=" block text-gray-700 font-semibold text-xs sm:text-sm mb-2">
                  {t(`${field.label}`)}
                </label>
                <FormInput
                  name={field.name}
                  type={field.type}
                  options={field.translatedOptions}
                  placeholderKey= {t(`${field.label}`)}
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

export default FamilyInfo;
