import type React from "react";
import { Stepper, Step, StepLabel } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { StepperWizardProps } from "../../types/form";
const StepperWizard: React.FC<StepperWizardProps> = ({ steps, activeStep }) => {
  const { t } = useTranslation();
  return (
    <Stepper activeStep={activeStep} alternativeLabel>
      {steps.map((label) => (
        <Step key={label}>
          <StepLabel>{t(`${label}.title`)}</StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StepperWizard;
