import type { RegisterOptions } from "react-hook-form";

/**
 * Generic required validation
 * Stores translation KEY, not translated text
 */
export const REQUIRED = (key: string): RegisterOptions => ({
  required: key,
});
/**
 * Minimum length validation
 * @param min - minimum number of characters required
 * @param key - translation key for error message
 */
export const minLengthValidation = (min: number, key: string): RegisterOptions => ({
  minLength: {
    value: min,
    message: key,
  },
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
  minLength: {
    value: 3,
    message: "common.minLength", }
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
   minLength: {
    value: 9,
    message: "common.minLength", }
    ,
   maxLength: {
    value: 12,
    message: "common.maxLength", }
});

/**
 * DOB helpers
 */
/**
 * Get minimum DOB for a given maximum age
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
 * Get maximum DOB for a given maximum age
 */
const getMaxDob = (maxAge: number) => {
  const today = new Date();
  return new Date(
    today.getFullYear() - maxAge,
    today.getMonth(),
    today.getDate()
  );
}
/**
 * Date of birth validation
 * Ensures age is between minAge and maxAge
 */
export const dobValidation = (minAge = 18, maxAge = 60): RegisterOptions => ({
  required: "personalInfo.errors.dobRequired",
  validate: (value: string) => {
    const selectedDate = new Date(value);
    const minDob = getMinDob(minAge);
    const maxDob = getMaxDob(maxAge);
    if (selectedDate > minDob) {
      return "personalInfo.errors.ageMustBe18";
    }

    if (selectedDate < maxDob) {
      return "personalInfo.errors.ageMustBeUnder60";
    }

    return true;
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
