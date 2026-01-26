import React, { Component, type ReactNode } from "react";
import { withTranslation, type WithTranslation } from "react-i18next";

interface Props extends WithTranslation {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

class ErrorBoundaryClass extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(): State {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Error caught by ErrorBoundary:", error, errorInfo);
  }

  render() {
    const { t } = this.props;

    if (this.state.hasError) {
      return (
        <div className="p-4 m-4 border border-red-500 rounded bg-red-100 text-red-700">
          <p>{t("common.somethingWentWrong")}</p>
          <p>{t("common.pleaseTryAgain")}</p>
        </div>
      );
    }

    return this.props.children;
  }
}
export const ErrorBoundary = withTranslation()(ErrorBoundaryClass);

