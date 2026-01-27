import type React from "react";
import { steps, stepPaths } from "../../constants/constants";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  nextStep,
  prevStep,
  resetForm,
  selectActiveStep,
  selectFormData,
  updateFamilyInfo,
  updatePersonalInfo,
  updateSituationInfo,
} from "../../store/formSlice";
import type { UserFormData } from "../../types/form";
import StepperWizard from "../ui/Stepper";

const formSteps = steps;

const UserFormWizard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const activeStep = useSelector(selectActiveStep);
  const userFormData = useSelector(selectFormData);
  const methods = useForm<UserFormData>({
    mode: "onBlur",
    shouldUnregister: false,
    defaultValues: userFormData,
  });
  const isLastStep = activeStep === steps.length - 1;
  // Update Redux based on active step
  const setDataOnStepChange = () => {
    const values = methods.getValues();
    switch (activeStep) {
      case 0:
        dispatch(updatePersonalInfo(values.personalInfo));
        break;
      case 1:
        dispatch(updateFamilyInfo(values.familyInfo));
        break;
      case 2:
        dispatch(updateSituationInfo(values.situationInfo));
        break;
    }
  };
  const onNext = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const valid = await methods.trigger();
    if (!valid) return;
    setDataOnStepChange();
    if (activeStep < stepPaths.length - 1) {
      dispatch(nextStep());
      navigate(`/user-wizard/${stepPaths[activeStep + 1]}`);
    }
  };

  const onBack = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setDataOnStepChange();
    if (activeStep > 0) {
      dispatch(prevStep());
      navigate(`/user-wizard/${stepPaths[activeStep - 1]}`);
    }
  };
  const onSubmit = (data: UserFormData) => {
    console.log("Final Submit:", data);
    alert(t("common.formSubmitted"));
    dispatch(resetForm());
    navigate(`/user-wizard/${stepPaths[0]}`);
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
        {/* Stepper */}
        <StepperWizard steps={formSteps} activeStep={activeStep} />
        {/* Step Form */}
        <fieldset className="mx-auto max-w-10/12 mt-6 border p-4 rounded">
          <Outlet />
        </fieldset>
        {/* Navigation */}
        <div className="flex justify-center mt-6">
          {activeStep > 0 && (
            <button
              type="button"
              className="px-4 py-2 m-2 border rounded"
              onClick={onBack}
            >
              {t("common.back")}
            </button>
          )}
          {!isLastStep ? (
            <button
              type="button"
              className="px-4 py-2 m-2 bg-blue-600 text-white rounded"
              onClick={onNext}
            >
              {t("common.next")}
            </button>
          ) : (
            <button
              type="submit"
              className="px-4 py-2 m-2 bg-green-600 text-white rounded"
            >
              {t("common.submit")}
            </button>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default UserFormWizard;
