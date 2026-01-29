import React from "react";
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
 // reading values from userFormField
  const fieldRows = FamilyFormData;
  return (
    <fieldset className="p-4">
      <legend className="text-sm sm:text-xl font-bold mb-4">{t("familyInfo.title")}</legend>

      <div className="flex flex-col gap-4">
        {fieldRows.map((row, rowIndex) => (
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
                  options={field.options?.map(o => ({ ...o, label: t(o.label) }))}
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
