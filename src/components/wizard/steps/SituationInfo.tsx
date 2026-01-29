import React, { useCallback } from "react";
import { useFormContext, type FieldValues, type RegisterOptions } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../ui/FormInput";
import AiSuggestionPopup from "../../ai/AiSuggestionPopup";
import { CurrentSituationInfo } from "../userFormField";
import { getErrorMessage } from "../../../utils/formHelpers";

const SituationInfo: React.FC = () => {
  const { t } = useTranslation();
  const { register, setValue, formState: { errors } } = useFormContext<FieldValues>();
  // reading form value from userFormField.ts
  const fieldRows = CurrentSituationInfo;

  /**
 * Accepts an AI suggestion and updates the corresponding form field.
 *
 * This function sets the value of the given field in the form and triggers validation.
 *
 * @param {string} fieldName - The name of the form field to update.
 * @param {string} suggestion - The suggested value to set for the field.
 */
 const handleAcceptSuggestion = useCallback(
  (fieldName: string, suggestion: string) => {
    setValue(fieldName, suggestion, { shouldValidate: true });
  },
  [setValue]
);
  return (
    <fieldset className="p-4">
      <legend className="text-sm sm:text-xl font-bold mb-4">{t("situationInfo.title")}</legend>

      <div className="flex flex-col gap-6">
        {fieldRows.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
                <label className="block text-gray-700 font-semibold text-xs sm:text-sm mb-1"> {t(`${field.label}`)}</label>

                <div className="flex gap-2 items-stretch">
                  <div className="w-2/3">
                    <FormInput
                      name={field.name}
                      type="textarea"
                      rows={3} 
                      placeholderKey= {t(`${field.label}`)}
                      register={register}
                      validation={field.validation as RegisterOptions}
                      error={getErrorMessage(errors, field.name, t)}
                    />
                  </div>
                  <div className="w-1/3 flex items-center justify-start">
                    <AiSuggestionPopup
                      fieldName= {field.name}
                      onAccept={handleAcceptSuggestion}
                    />
                  </div>
                </div>
              </div>
        ))}
      </div>
    </fieldset>
  );
};

export default SituationInfo;
