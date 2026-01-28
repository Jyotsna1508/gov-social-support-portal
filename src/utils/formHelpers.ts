import type { FieldErrors, FieldValues } from "react-hook-form";

/**
 * Type-safe helper to get nested error messages from react-hook-form
 * @param errors - formState.errors
 * @param fieldName - nested field name, e.g., "personalInfo.name"
 * @param t - translation function from react-i18next
 * @returns translated error message or undefined
 */
export const getErrorMessage = <T extends FieldValues>(
  errors: FieldErrors<T>,
  fieldName: string,
  t: (key: string) => string
): string | undefined => {
  const keys = fieldName.split(".");
  let current: unknown = errors;

  for (const key of keys) {
    if (current && typeof current === "object" && key in current) {
      current = (current as Record<string, unknown>)[key];
    } else {
      current = undefined;
      break;
    }
  }

  if (current && typeof current === "object" && "message" in current) {
    return t((current as { message: string }).message);
  }

  return undefined;
};
