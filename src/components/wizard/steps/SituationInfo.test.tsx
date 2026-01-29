import React from "react";
import { render, screen } from "@testing-library/react";
import { useForm, FormProvider } from "react-hook-form";
import type { AiSuggestionPopupProps } from "../../../types/ai";
import type { FormInputProps } from "../../../types/form";
import SituationInfo from "./SituationInfo";
import { describe, expect, vi, test } from "vitest";

/* -------------------- mocks -------------------- */

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

vi.mock("../../ui/FormInput", () => {
  const FormInput = (props: FormInputProps) => (
    <textarea
      data-testid={`form-input-${props.name}`}
      name={props.name}
      rows={props.rows || 1}
    />
  );
  return { default: FormInput };
});

vi.mock("../../ai/AiSuggestionPopup", () => {
  const AiSuggestionPopup = (props: AiSuggestionPopupProps) => (
    <button
      data-testid={`ai-popup-${props.fieldName}`}
      onClick={() => props.onAccept(props.fieldName, "Suggested Text")}
    >
      Accept
    </button>
  );
  return { default: AiSuggestionPopup }; // ✅ must return { default: Component }
});

/* -------------------- helper -------------------- */

const renderWithForm = () => {
  const Wrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const methods = useForm();
    return <FormProvider {...methods}>{children}</FormProvider>;
  };

  return render(<SituationInfo />, { wrapper: Wrapper });
};

/* -------------------- test cases -------------------- */

describe("SituationInfo Component", () => {
  test("renders title and all fields with AI popup", () => {
    renderWithForm();

    expect(screen.getByText("situationInfo.title")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-situationInfo.currentSituation")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-situationInfo.employmentCircumstances")).toBeInTheDocument();
    expect(screen.getByTestId("form-input-situationInfo.reasonForApplying")).toBeInTheDocument();
    
    // check AI popup buttons
    expect(screen.getByTestId("ai-popup-situationInfo.currentSituation")).toBeInTheDocument();
    expect(screen.getByTestId("ai-popup-situationInfo.employmentCircumstances")).toBeInTheDocument();
    expect(screen.getByTestId("ai-popup-situationInfo.reasonForApplying")).toBeInTheDocument();
  });
});
