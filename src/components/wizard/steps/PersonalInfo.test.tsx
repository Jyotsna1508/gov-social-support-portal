import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import PersonalInfo from "./PersonalInfo";
import type { FormInputProps } from "../../../types/form";

/* -------------------- mocks -------------------- */

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../../../hooks/useLanguage", () => ({
  useLanguage: () => ({
    language: "en",
  }),
}));

jest.mock("../../ui/FormInput", () => (props: FormInputProps) => {
  return (
    <input
      data-testid={`form-input-${props.name}`}
      name={props.name}
      placeholder={props.placeholderKey}
      aria-invalid={!!props.error}
    />
  );
});

/* -------------------- helper render -------------------- */
const renderWithForm = () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(<PersonalInfo />, { wrapper: Wrapper });
};

/* -------------------- tests -------------------- */
describe("PersonalInfo Component", () => {
  test("renders all personal info fields", () => {
    renderWithForm();

    const fields = [
      "personalInfo.name",
      "personalInfo.nationalId",
      "personalInfo.dateOfBirth",
      "personalInfo.gender",
      "personalInfo.address",
      "personalInfo.city",
      "personalInfo.state",
      "personalInfo.country",
      "personalInfo.phone",
      "personalInfo.email",
    ];

    fields.forEach((field) => {
      expect(screen.getByTestId(`form-input-${field}`)).toBeInTheDocument();
    });
  });

  test("renders translated labels as placeholder", () => {
    renderWithForm();

    const placeholders = [
      "personalInfo.name",
      "personalInfo.nationalId",
      "personalInfo.dateOfBirth",
      "personalInfo.gender",
      "personalInfo.address",
      "personalInfo.city",
      "personalInfo.state",
      "personalInfo.country",
      "personalInfo.phone",
      "personalInfo.email",
    ];

    placeholders.forEach((placeholder) => {
      expect(screen.getByPlaceholderText(placeholder)).toBeInTheDocument();
    });
  });
});
