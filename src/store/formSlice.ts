import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { INITIAL_USER_FORM_DATA } from "../constants/constants";
import type {
  FamilyInfoData,
  FormState,
  PersonalInfoData,
  SituationData,
  UserFormData,
} from "../types/form";
import { submitUserForm } from "./formSubmitThunk";

const initialState: FormState = {
  activeStep: 0,
  data: INITIAL_USER_FORM_DATA,
  isSubmitting: false,
  submitError: null,
};

const formSlice = createSlice({
  name: "userForm",
  initialState,
  reducers: {
    nextStep(state) {
      if (state.activeStep < 2) state.activeStep += 1;
    },
    prevStep(state) {
      if (state.activeStep > 0) state.activeStep -= 1;
    },
    updatePersonalInfo(
      state,
      action: PayloadAction<Partial<PersonalInfoData>>,
    ) {
      state.data.personalInfo = {
        ...state.data.personalInfo,
        ...action.payload,
      };
    },
    updateFamilyInfo(state, action: PayloadAction<Partial<FamilyInfoData>>) {
      state.data.familyInfo = {
        ...state.data.familyInfo,
        ...action.payload,
      };
    },
    updateSituationInfo(state, action: PayloadAction<Partial<SituationData>>) {
      state.data.situationInfo = {
        ...state.data.situationInfo,
        ...action.payload,
      };
    },
    updateForm(state, action: PayloadAction<UserFormData>) {
      state.data = action.payload;
    },
    resetForm(state) {
      state.activeStep = 0;
      state.data = INITIAL_USER_FORM_DATA;
      state.isSubmitting = false;
      state.submitError = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitUserForm.pending, (state) => {
        state.isSubmitting = true;
        state.submitError = null;
      })
      .addCase(submitUserForm.fulfilled, (state) => {
        state.isSubmitting = false;
        state.activeStep = 0;
        state.data = INITIAL_USER_FORM_DATA;
      })
      .addCase(submitUserForm.rejected, (state, action) => {
        state.isSubmitting = false;
        state.submitError = action.payload as string;
      });
  },
});

export const {
  nextStep,
  prevStep,
  updatePersonalInfo,
  updateFamilyInfo,
  updateSituationInfo,
  updateForm,
  resetForm,
} = formSlice.actions;

export const selectActiveStep = (state: { form: FormState }) =>
  state.form.activeStep;
export const selectPersonalInfo = (state: { form: FormState }) =>
  state.form.data.personalInfo;
export const selectFamilyInfo = (state: { form: FormState }) =>
  state.form.data.familyInfo;
export const selectSituationInfo = (state: { form: FormState }) =>
  state.form.data.situationInfo;
export const selectFormData = (state: { form: FormState }) => state.form.data;
export const selectFormSubmitting = (state: { form: FormState }) =>
  state.form.isSubmitting;
export const selectFormSubmitError = (state: { form: FormState }) =>
  state.form.submitError;

export default formSlice.reducer;
