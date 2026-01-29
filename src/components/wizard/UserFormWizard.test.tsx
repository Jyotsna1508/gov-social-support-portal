import UserFormWizard from "./UserFormWizard";
import { render, screen } from "@testing-library/react";
import type { ButtonProps } from "@mui/material";

/* -------------------- mocks -------------------- */

jest.mock("../ui/Stepper", () => ({
  __esModule: true,
  default: ({ activeStep }: { activeStep: number }) => (
    <div data-testid="stepper">{activeStep}</div>
  ),
}));

jest.mock("react-router-dom", () => ({
  Outlet: () => <div data-testid="outlet" />,
  useNavigate: () => jest.fn(),
}));

jest.mock("react-i18next", () => ({
  useTranslation: () => ({ t: (key: string) => key }),
}));

jest.mock("@mui/material", () => {
  const originalModule = jest.requireActual("@mui/material");
  return {
    ...originalModule,
    Button: (props: ButtonProps) => <button {...props}>{props.children}</button>,
  };
});

jest.mock("@mui/icons-material/Send", () => () => <span>SendIcon</span>);
jest.mock("@mui/icons-material/NavigateNext", () => () => <span>NextIcon</span>);
jest.mock("@mui/icons-material/ArrowBackIos", () => () => <span>BackIcon</span>);

jest.mock("react-redux", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  useSelector: (selector: Function) => {
    if (selector.name === "selectActiveStep") return 2;
    if (selector.name === "selectFormSubmitting") return false;
    if (selector.name === "selectFormSubmitError") return null;
    return {};
  },
  useDispatch: () => jest.fn(),
}));

/* -------------------- test cases -------------------- */


describe("UserFormWizard", () => {
  test("renders stepper", () => {
    render(<UserFormWizard />);
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
  });

  test("renders submit button on last step", () => {
    render(<UserFormWizard />);
    expect(screen.getByText("common.submit")).toBeInTheDocument();
  });

  test("renders outlet", () => {
    render(<UserFormWizard />);
    expect(screen.getByTestId("outlet")).toBeInTheDocument();
  });
});
