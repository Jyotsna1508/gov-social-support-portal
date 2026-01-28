import type { RegisterOptions } from "react-hook-form";

/**
 * Generic required validation
 * Stores translation KEY, not translated text
 */
export const REQUIRED = (key: string): RegisterOptions => ({
  required: key,
});

/**
 * Patterns
 */
export const UAE_PHONE_PATTERN = /^(?:\+971|0)?5[0-9]{8}$/;
export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const NUMBERS_ONLY = /^[0-9]+$/;

/**
 * Name validation
 */
export const nameValidation = (): RegisterOptions => ({
  required: "personalInfo.errors.nameRequired",
});

/**
 * National ID validation
 */
export const nationalIdValidation = (): RegisterOptions => ({
  required: "personalInfo.errors.nationalIdRequired",
  pattern: {
    value: NUMBERS_ONLY,
    message: "personalInfo.errors.nationalIdPattern",
  },
});

/**
 * DOB helpers
 */
const getMinDob = (minAge: number) => {
  const today = new Date();
  return new Date(
    today.getFullYear() - minAge,
    today.getMonth(),
    today.getDate()
  );
};

/**
 * Date of birth validation
 */
export const dobValidation = (): RegisterOptions => ({
  required: "personalInfo.errors.dobRequired",
  validate: (value: string) => {
    const selectedDate = new Date(value);
    const minDob = getMinDob(18);

    return (
      selectedDate <= minDob ||
      "personalInfo.errors.ageMustBe18"
    );
  },
});

/**
 * Email validation
 */
export const emailValidation = (): RegisterOptions => ({
  required: "personalInfo.errors.emailRequired",
  pattern: {
    value: EMAIL_PATTERN,
    message: "personalInfo.errors.emailPattern",
  },
});

/**
 * Phone validation
 */
export const phoneValidation = (): RegisterOptions => ({
  required: "personalInfo.errors.phoneRequired",
  pattern: {
    value: UAE_PHONE_PATTERN,
    message: "personalInfo.errors.phonePattern",
  },
});
