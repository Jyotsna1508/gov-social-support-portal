// src/components/forms/steps/SituationInfo.tsx
import React from "react";
import { useFormContext, type FieldValues } from "react-hook-form";
import { useTranslation } from "react-i18next";
import FormInput from "../../ui/FormInput";
import AiSuggestionPopup from "../../ai/AiSuggestionPopup";
import { CurrentSituationInfo } from "../userFormField";
import { getErrorMessage } from "../../../utils/formHelpers";

const SituationInfo: React.FC = () => {
  const { t } = useTranslation();
  const { register, setValue, formState: { errors } } = useFormContext<FieldValues>();

  const handleAcceptSuggestion = (fieldName: string, suggestion: string) => {
    setValue(fieldName, suggestion);
  };

  // Fields in pairs per row
  const fieldRows = CurrentSituationInfo;

  return (
    <fieldset className="p-4 border rounded">
      <legend className="font-bold mb-4">{t("situationInfo.title")}</legend>

      <div className="flex flex-col gap-6">
        {fieldRows.map((field) => (
            <div key={field.name} className="flex flex-col gap-2">
                <label className="font-semibold mb-2"> {t(`${field.label}`)}</label>

                <div className="flex gap-2 items-start">
                  <div className="w-2/3">
                    <FormInput
                      name={field.name}
                      type="textarea"
                      placeholderKey= {t(`${field.label}`)}
                      register={register}
                      validation={field.validation}
                      error={getErrorMessage(errors, field.name, t)}
                    />
                  </div>

                  <div className="w-1/3 flex justify-start mt-0">
                    <AiSuggestionPopup
                      fieldName= {t(`${field.label}`)}
                      onAccept={(suggestion) => handleAcceptSuggestion(field.name, suggestion)}
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
