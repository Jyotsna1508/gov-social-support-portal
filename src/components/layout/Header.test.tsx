import { render, screen, fireEvent } from "@testing-library/react";
import Header from "./Header";
import { describe, it, expect, vi } from "vitest";

vi.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

const toggleMock = vi.fn();

vi.mock("../../hooks/useLanguage", () => ({
  useLanguage: () => ({
    language: "en",
    toggleLanguage: toggleMock,
  }),
}));

describe("Header component", () => {
  it("renders title and button", () => {
    render(<Header />);
    expect(screen.getByText("common.socialSupport")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "common.switchLanguage" })).toBeInTheDocument();
  });

  it("calls toggleLanguage on button click", () => {
    render(<Header />);
    const button = screen.getByRole("button", { name: "common.switchLanguage" });
    fireEvent.click(button);
    expect(toggleMock).toHaveBeenCalled();
  });
});
