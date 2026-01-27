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
}

