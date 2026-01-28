import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Box, Typography, Stack, CircularProgress, TextField } from "@mui/material";
import type { AiSuggestionPopupProps } from "../../types/ai";
import { useSelector } from "react-redux";
import { selectFamilyInfo } from "../../store/formSlice";
import { streamAi } from "../../services/ai";
import { boxStyle } from "../../constants/constants";
import { generatePrompt } from "../../utils/promtGenerator";

const AiSuggestionPopup: React.FC<AiSuggestionPopupProps> = ({
  fieldName,
  onAccept,
}) => {
  const { t } = useTranslation();
  const financialData = useSelector(selectFamilyInfo);
  const [popupText, setPopupText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [controller, setController] = useState<AbortController | null>(null);
   const [isOpen, setIsOpen] = useState(false);
   
  const handleHelpMeWrite = async() => {
    setIsOpen(true);
    setPopupText("");
    setLoading(true);
    setIsEditing(false);
    if(controller) controller.abort();
    const newController = new AbortController();
    setController(newController);
     try {
      await streamAi({
        prompt: generatePrompt(financialData, fieldName),
        financialData,
        signal: newController.signal,
        onToken: (token: string) => setPopupText((prev) => prev + token),
      });
    } catch (err: unknown) {
      if (err instanceof DOMException && err.name === "AbortError") {
        setError("aiInfo.requestAborted");
      } else if (err instanceof Error) {
        setError("aiInfo.requestFailed");
      } else {
        setError("aiInfo.unknownError");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    if (controller) controller.abort();
    setLoading(false);
    setIsEditing(true);
  }

  const handleClose = () => {
    if (controller) controller.abort();
    setPopupText("");
    setLoading(false);
    setIsEditing(false);
    setError(null);
    setIsOpen(false);
  }

  return (
    <>
      {/* Trigger button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleHelpMeWrite}
        disabled={loading}
        sx={{ p: 1 }}
      >
        {loading ? <CircularProgress size={20} /> : t("aiInfo.helpMeWrite")}
      </Button>

      {/* Modal */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="ai-suggestion-title"
        aria-describedby="ai-suggestion-description"
        closeAfterTransition
      >
        <Box sx={boxStyle}>
          <Typography id="ai-suggestion-title" variant="h6" mb={2}>
            {t("aiInfo.suggestion")}
          </Typography>
          {loading && (
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <CircularProgress size={20} />
              <Typography>{t("aiInfo.generatingSuggestion")}</Typography>
            </Stack>
          )}

          {error && <Typography color="error">{t(error)}</Typography>}

          {isEditing ? (
            <TextField
              fullWidth
              multiline
              minRows={4}
              value={popupText}
              onChange={(e) => setPopupText(e.target.value)}
            />
          ) : (
            <Typography id="ai-suggestion-description" mb={3}>
              {popupText}
            </Typography>
          )}
          <Stack direction="row" spacing={2} justifyContent="flex-end" mt={2}>
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              {t("aiInfo.discard")}
            </Button>
            <Button
              variant="contained"
              color="success"
              disabled={!popupText || !!error}
              onClick={() => {
                onAccept(popupText!);
                handleClose();
              }}
            >
              {t("aiInfo.accept")}
            </Button>
            <Button
              variant="contained"
              color="primary"
              disabled={!popupText || !!error}
              onClick={() => {
                handleEdit();
              }}
            >
              {t("aiInfo.edit")}
            </Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default AiSuggestionPopup;
