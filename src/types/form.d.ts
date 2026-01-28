import { type RegisterOptions } from "react-hook-form";
export interface PersonalInfoData {
  name: string;
  nationalId: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  city: string;
  state: string;
  country: string;
  phone: string;
  email: string;
}


export interface FamilyInfoData {
  maritalStatus: string;
  dependents: number;
  employmentStatus: string;
  monthlyIncome: number;
  housingStatus: string;
}

export interface SituationData {
  currentSituation: string;
  employmentCircumstances: string;
  reasonForApplying: string;
}

export interface UserFormData {
  personalInfo: PersonalInfoData;
  familyInfo: FamilyInfoData;
  situationInfo: SituationData;
}

export interface FormState {
  activeStep: number;
  data: UserFormData;
  isSubmitting: boolean,
  submitError: string | null,
}

export interface StepperWizardProps {
  steps: string[];
  activeStep: number;
}
export interface SelectOption {
  label: string;
  value: string;
}

export interface FormInputProps {
  name: string;
  placeholderKey: string;
  type?: string;
  rows?: number;
  options?: { label: string; value: string }[];
  register: UseFormRegister<FieldValues>;
  validation?: RegisterOptions;
  error?: string
}


