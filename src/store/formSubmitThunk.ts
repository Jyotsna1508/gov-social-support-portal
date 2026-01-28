import { createAsyncThunk } from "@reduxjs/toolkit";
import type { RootState } from "./index";
import type { UserFormData } from "../types/form";

export const submitUserForm = createAsyncThunk<
  { success: true },
  void,
  { state: RootState }
>("userForm/submit", async (_, { getState, rejectWithValue }) => {
  try {
    const formData: UserFormData = getState().form.data;

    // 🔹 Mock API call
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Submitted payload:", formData);

    return { success: true };
  } catch {
    return rejectWithValue("FORM_SUBMIT_FAILED");
  }
});
