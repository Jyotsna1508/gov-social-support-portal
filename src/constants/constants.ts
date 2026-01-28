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
export const steps = ['personalInfo', 'familyInfo', 'situationInfo'];
export const stepPaths = ["personal", "family", "situation"];

export const STEPS_FALLBACK_TEXT: Record<string, string> = {
  loadingFamilyInfo: "Loading Family Info...",
  loadingSituationInfo: "Loading Situation Info...",
};


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

export const alertCss = {
    width: "50%",
    margin: "16px auto",
    mb: 2
};

export const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: { xs: "90%", sm: 400 },
};
