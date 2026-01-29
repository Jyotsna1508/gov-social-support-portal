import { render, screen } from "@testing-library/react";
import FormInput from "./FormInput";

describe("FormInput component", () => {
  const mockRegister = jest.fn(() => ({}));

  it("renders a text input with placeholder", () => {
    render(
      <FormInput
        name="firstName"
        placeholderKey="Enter your name"
        register={mockRegister}
      />
    );

    const input = screen.getByPlaceholderText("Enter your name") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.type).toBe("text");
  });

  it("renders error message when error prop is passed", () => {
    render(
      <FormInput
        name="firstName"
        placeholderKey="Enter your name"
        register={mockRegister}
        error="This field is required"
      />
    );

    const errorMessage = screen.getByRole("alert");
    expect(errorMessage).toBeInTheDocument();
    expect(errorMessage).toHaveTextContent("This field is required");
  });
});
