import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import FamilyInfo from "./FamilyInfo";
import type { FormInputProps } from "../../../types/form";

/* -------------------- mocks -------------------- */

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

jest.mock("../../ui/FormInput", () => (props: FormInputProps) => {
  return (
    <input
      data-testid={`form-input-${props.name}`}
      name={props.name}
      aria-invalid={!!props.error}
    />
  );
});


const renderWithForm = () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(<FamilyInfo />, { wrapper: Wrapper });
};

describe("FamilyInfo Component", () => {
  test("renders family info title and all form fields", () => {
    renderWithForm();
    expect(
      screen.getByText("familyInfo.title")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-input-familyInfo.maritalStatus")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-input-familyInfo.dependents")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-input-familyInfo.employmentStatus")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-input-familyInfo.monthlyIncome")
    ).toBeInTheDocument();

    expect(
      screen.getByTestId("form-input-familyInfo.housingStatus")
    ).toBeInTheDocument();
  });

  test("renders translated labels for family fields", () => {
    renderWithForm();

    expect(
      screen.getByText("familyInfo.maritalStatus")
    ).toBeInTheDocument();

    expect(
      screen.getByText("familyInfo.dependents")
    ).toBeInTheDocument();

    expect(
      screen.getByText("familyInfo.employmentStatus")
    ).toBeInTheDocument();

    expect(
      screen.getByText("familyInfo.monthlyIncome")
    ).toBeInTheDocument();

    expect(
      screen.getByText("familyInfo.housingStatus")
    ).toBeInTheDocument();
  });
});
