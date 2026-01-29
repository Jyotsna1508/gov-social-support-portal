import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (key: string) => key,
  }),
}));

describe("Footer", () => {
  it("renders correctly with all texts and links", () => {
    render(<Footer />);

    expect(
      screen.getByText(`© ${new Date().getFullYear()} common.uaeGovernment`)
    ).toBeInTheDocument();

    expect(screen.getByText("common.aboutUaeGovernment")).toBeInTheDocument();
    expect(screen.getByText("common.contactUs")).toBeInTheDocument();
    expect(screen.getByText("common.privacyPolicy")).toBeInTheDocument();

    expect(screen.getByText("common.aboutUaeGovernment").closest("a")).toHaveAttribute(
      "href",
      "https://u.ae/en/about-the-uae/government"
    );
    expect(screen.getByText("common.contactUs").closest("a")).toHaveAttribute(
      "href",
      "https://u.ae/en/contact-us"
    );
    expect(screen.getByText("common.privacyPolicy").closest("a")).toHaveAttribute(
      "href",
      "https://u.ae/en/privacy-policy"
    );
  });
});
