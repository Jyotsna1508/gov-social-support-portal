import { COUNTRIES } from "../../constants/countries";
import { dobValidation, emailValidation, minLengthValidation, nameValidation, nationalIdValidation, phoneValidation, REQUIRED } from "../../utils/validations";

export const CurrentSituationInfo = [
      {
        name: "situationInfo.currentSituation",
        label: "situationInfo.currentSituation",
         validation: {
      ...REQUIRED("situationInfo.errors.currentSituationRequired"),
      ...minLengthValidation(10, "common.minLength"),
    },
      },
      {
        name: "situationInfo.employmentCircumstances",
        label: "situationInfo.employmentCircumstances",
         validation: {
      ...REQUIRED("situationInfo.errors.employmentCircumstancesRequired"),
      ...minLengthValidation(10, "common.minLength"),
      },
      },
      {
        name: "situationInfo.reasonForApplying",
        label: "situationInfo.reasonForApplying",
        validation: {
      ...REQUIRED("situationInfo.errors.reasonForApplyingRequired"),
      ...minLengthValidation(10, "common.minLength"),
       },
      },
  ];
export const PersonalFormData = [
    [
      { name: "personalInfo.name", label: "personalInfo.name", type: "text",
        validation: nameValidation() },
      { name: "personalInfo.nationalId", label: "personalInfo.nationalId", type: "number", validation: nationalIdValidation() },
    ],
    [
      { name: "personalInfo.dateOfBirth", label: "personalInfo.dateOfBirth", type: "date", validation: dobValidation() },
      {
        name: "personalInfo.gender",
        label: "personalInfo.gender",
        type: "select",
        options: [
          { label: "personalInfo.genderOptions.male", value: "male" },
          { label: "personalInfo.genderOptions.female", value: "female" },
          { label: "personalInfo.genderOptions.other", value: "other" },
        ],
        validation: REQUIRED("personalInfo.errors.genderRequired"),
      },
    ],
    [
      { name: "personalInfo.address", label: "personalInfo.address", type: "text", validation: REQUIRED("personalInfo.errors.addressRequired") },
    ],
    [
      { name: "personalInfo.city", label: "personalInfo.city", type: "text", validation: REQUIRED("personalInfo.errors.cityRequired") },
      { name: "personalInfo.state", label: "personalInfo.state", type: "text", validation: REQUIRED("personalInfo.errors.stateRequired") },
    ],
    [
      {
      name: "personalInfo.country",
      label: "personalInfo.country",
      type: "select",
      options: COUNTRIES.map((c) => ({
        label: c.name,
        value: c.key,
      })),
      validation: REQUIRED("personalInfo.errors.countryRequired"),
    },
      { name: "personalInfo.phone", label: "personalInfo.phone", type: "text", validation: phoneValidation() },
    ],
    [
      { name: "personalInfo.email", label: "personalInfo.email", type: "email", validation: emailValidation() },
    ],
];

export const FamilyFormData = [
    [
      {
        name: "familyInfo.maritalStatus",
        label: "familyInfo.maritalStatus",
        type: "select",
        options: [
          { label: "familyInfo.maritalStatusOptions.married", value: "married" },
          { label: "familyInfo.maritalStatusOptions.single", value: "single" },
          { label: "familyInfo.maritalStatusOptions.divorced", value: "divorced" },
        ],
        validation: REQUIRED("familyInfo.errors.maritalStatusRequired"),
      },
      {
        name: "familyInfo.dependents",
        label: "familyInfo.dependents",
        type: "number",
        validation: REQUIRED("familyInfo.errors.dependentsRequired"),
      },
    ],
    [
      {
        name: "familyInfo.employmentStatus",
        label: "familyInfo.employmentStatus",
        type: "select",
        options: [
          { label: "familyInfo.employmentStatusOptions.employed", value: "employed" },
          { label: "familyInfo.employmentStatusOptions.selfEmployed", value: "selfEmployed" },
          { label: "familyInfo.employmentStatusOptions.unemployed", value: "unemployed" },
        ],
        validation: REQUIRED("familyInfo.errors.employmentStatusRequired"),
      },
      {
        name: "familyInfo.monthlyIncome",
        label: "familyInfo.monthlyIncome",
        type: "number",
        validation: REQUIRED("familyInfo.errors.monthlyIncomeRequired"),
      },
    ],
    [
      {
        name: "familyInfo.housingStatus",
        label: "familyInfo.housingStatus",
        type: "select",
        options: [
          { label: "familyInfo.housingStatusOptions.owned", value: "owned" },
          { label: "familyInfo.housingStatusOptions.rented", value: "rented" },
          { label: "familyInfo.housingStatusOptions.mortgaged", value: "mortgaged" },
          { label: "familyInfo.housingStatusOptions.other", value: "other" },
        ],
        validation: REQUIRED("familyInfo.errors.housingStatusRequired"),
      },
    ]
  ];