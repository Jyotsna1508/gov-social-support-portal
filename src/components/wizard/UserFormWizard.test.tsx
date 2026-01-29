import UserFormWizard from "./UserFormWizard";
import { render, screen } from "@testing-library/react";
import type { ButtonProps } from "@mui/material";
import { describe, expect, vi, test } from "vitest";

/* -------------------- mocks -------------------- */


vi.mock("../ui/Stepper", () => {
  const Stepper = ({ activeStep }: { activeStep: number }) => (
    <div data-testid="stepper">{activeStep}</div>
  );
  return {
    __esModule: true,
    default: Stepper,
  };
});

vi.mock("react-router-dom", () => {
  return {
    __esModule: true,
    Outlet: () => <div data-testid="outlet" />,
    useNavigate: () => vi.fn(),
  };
});
vi.mock(
  "react-i18next",
  async (importOriginal) => {
    const actual = await importOriginal<typeof import("react-i18next")>();
    return {
      ...actual,
      useTranslation: () => ({
        t: (key: string) => key,
        i18n: actual.useTranslation().i18n,
      }),
    };
  }
);;

vi.mock("../../../hooks/useLanguage", () => ({
  useLanguage: () => ({
    language: "en",
  }),
}));

vi.mock("@mui/material", async () => {
  const originalModule = await vi.importActual<typeof import("@mui/material")>(
    "@mui/material"
  );
  return {
    ...originalModule,
    Button: (props: ButtonProps) => (
      <button {...props}>{props.children}</button>
    ),
  };
});

vi.mock("@mui/icons-material/Send", () => {
  const SendIcon = () => <span>SendIcon</span>;
  return { __esModule: true, default: SendIcon };
});

vi.mock("@mui/icons-material/NavigateNext", () => {
  const NextIcon = () => <span>NextIcon</span>;
  return { __esModule: true, default: NextIcon };
});

vi.mock("@mui/icons-material/ArrowBackIos", () => {
  const BackIcon = () => <span>BackIcon</span>;
  return { __esModule: true, default: BackIcon };
});

vi.mock("react-redux", () => ({
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  useSelector: (selector: Function) => {
    if (selector.name === "selectActiveStep") return 2;
    if (selector.name === "selectFormSubmitting") return false;
    if (selector.name === "selectFormSubmitError") return null;
    return {};
  },
  useDispatch: () => vi.fn(),
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
