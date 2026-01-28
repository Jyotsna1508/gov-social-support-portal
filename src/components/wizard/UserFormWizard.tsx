import type React from "react";
import {
  steps,
  stepPaths,
  INITIAL_USER_FORM_DATA,
} from "../../constants/constants";
import { useTranslation } from "react-i18next";
import { useForm, FormProvider } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import {
  nextStep,
  prevStep,
  selectActiveStep,
  selectFormData,
  selectFormSubmitError,
  selectFormSubmitting,
  updateFamilyInfo,
  updateForm,
  updatePersonalInfo,
  updateSituationInfo,
} from "../../store/formSlice";
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import type { UserFormData } from "../../types/form";
import StepperWizard from "../ui/Stepper";
import { submitUserForm } from "../../store/formSubmitThunk";
import type { AppDispatch } from "../../store";
import Loader from "../ui/Loader";

const formSteps = steps;

const UserFormWizard: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const activeStep = useSelector(selectActiveStep);
  const userFormData = useSelector(selectFormData);
  const isSubmitting = useSelector(selectFormSubmitting);
  const submitError = useSelector(selectFormSubmitError);
  const methods = useForm<UserFormData>({
    mode: "all",
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
    dispatch(updateForm(data));
    dispatch(submitUserForm())
      .unwrap()
      .then(() => {
        methods.reset(INITIAL_USER_FORM_DATA);
        alert("Form submitted successfully!!")
        navigate(`/user-wizard/${stepPaths[0]}`);
      })
      .catch((err) => {
        console.error("Submit failed:", err);
      });
  };
  return (
    <FormProvider {...methods}>
      {isSubmitting && <Loader />}
      <form onSubmit={methods.handleSubmit(onSubmit)} className="mt-6">
        {/* Stepper */}
        <StepperWizard steps={formSteps} activeStep={activeStep} />
        {/* Step Form */}
        <fieldset className="mx-auto max-w-3/5 w-3/5 mt-6 border p-4 rounded">
          <Outlet />
        </fieldset>
        {/* Navigation */}
        <div className="flex justify-center gap-4 mt-6">
          {activeStep > 0 && (
            <Button variant="outlined" startIcon={<ArrowBackIosIcon />}  onClick={onBack}>{t("common.back")}</Button>
          )}
          {!isLastStep ? (
            <Button
              variant="contained" 
              endIcon={<NavigateNextIcon />}
              onClick={onNext}
            >
              {t("common.next")}
            </Button>
          ) : (
            <>
              <Button variant="contained" type="submit" endIcon={<SendIcon />} disabled={!methods.formState.isValid || isSubmitting}>
                {t("common.submit")}
              </Button>
              {submitError && (
                <p className="text-red-600 mt-2">{submitError}</p>
              )}
            </>
          )}
        </div>
      </form>
    </FormProvider>
  );
};
export default UserFormWizard;
