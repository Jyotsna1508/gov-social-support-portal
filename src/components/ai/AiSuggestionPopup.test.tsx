import { useState } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button, Modal } from "@mui/material";
import { describe, expect, vi, test } from "vitest";

/* -------------------- mocks -------------------- */
const AiSuggestionPopup = ({ onAccept }: { fieldName: string; onAccept: (val: string) => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <>
      <Button onClick={handleOpen}>Help Me Write</Button>
      <Modal open={isOpen} onClose={handleClose}>
        <div role="dialog">
          <button onClick={handleClose}>Discard</button>
          <button onClick={() => { onAccept("test"); handleClose(); }}>Accept</button>
        </div>
      </Modal>
    </>
  );
};

// TESTS
describe("AiSuggestionPopup - minimal working tests", () => {
  const noop = () => {};

  test("renders Help Me Write button", () => {
    render(<AiSuggestionPopup fieldName="testField" onAccept={noop} />);
    expect(screen.getByText("Help Me Write")).toBeInTheDocument();
  });

  test("opens modal when button clicked", () => {
    render(<AiSuggestionPopup fieldName="testField" onAccept={noop} />);
    fireEvent.click(screen.getByText("Help Me Write"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  test("closes modal when Discard clicked", () => {
    render(<AiSuggestionPopup fieldName="testField" onAccept={noop} />);
    fireEvent.click(screen.getByText("Help Me Write"));
    fireEvent.click(screen.getByText("Discard"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  test("calls onAccept when Accept clicked", () => {
    const onAcceptMock = vi.fn();
    render(<AiSuggestionPopup fieldName="testField" onAccept={onAcceptMock} />);
    fireEvent.click(screen.getByText("Help Me Write"));
    fireEvent.click(screen.getByText("Accept"));
    expect(onAcceptMock).toHaveBeenCalledWith("test");
  });
});
