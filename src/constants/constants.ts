import type { UserFormData } from "../types/form";

export const LANGUAGE = {
  EN: 'en' as const,
  AR: 'ar' as const
};
export type LanguageType = typeof LANGUAGE[keyof typeof LANGUAGE];

export const DIRECTION = {
    RTL: 'rtl',
    LTR: 'ltr'
}

export const INITIAL_USER_FORM_DATA: UserFormData = {
  personalInfo: {
    name: "",
    nationalId: "",
    dateOfBirth: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    country: "",
    phone: "",
    email: "",
  },
  familyInfo: {
    maritalStatus: "",
    dependents: 0,
    employmentStatus: "",
    monthlyIncome: 0,
    housingStatus: "",
  },
  situationInfo: {
    currentSituation: "",
    employmentCircumstances: "",
    reasonForApplying: "",
  },
};
