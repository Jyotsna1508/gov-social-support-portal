import React, { useCallback, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Box, Typography, Stack, CircularProgress, TextField } from "@mui/material";
import type { AiSuggestionPopupProps } from "../../types/ai";
import { useSelector } from "react-redux";
import { selectFamilyInfo } from "../../store/formSlice";
import { streamAi } from "../../services/streamAi";
import { boxStyle } from "../../constants/constants";
import { generatePrompt } from "../../utils/promtGenerator";

const AiSuggestionPopup = React.memo(({ fieldName, onAccept }: AiSuggestionPopupProps) => {
  const { t } = useTranslation();
  const financialData = useSelector(selectFamilyInfo);
  const [popupText, setPopupText] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const controllerRef = useRef<AbortController | null>(null);
   const [isOpen, setIsOpen] = useState(false);
   
  const handleHelpMeWrite = async() => {
    setIsOpen(true);
    setPopupText("");
    setLoading(true);
    setIsEditing(false);
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();
     try {
      await streamAi({
        prompt: generatePrompt(financialData, fieldName),
        signal: controllerRef.current.signal,
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

    const handleClose = useCallback(() => {
      controllerRef.current?.abort();
      setPopupText("");
      setLoading(false);
      setIsEditing(false);
      setError(null);
      setIsOpen(false);
    }, []);

    const handleEdit = () => {
      controllerRef.current?.abort();
      setLoading(false);
      setIsEditing(true);
    };

   const handleAccept = useCallback(() => {
      if (popupText) {
        onAccept(fieldName, popupText);
        handleClose();
      }
    }, [popupText, fieldName, onAccept, handleClose]);

  return (
    <>
      {/* Trigger button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleHelpMeWrite}
        disabled={loading}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        aria-controls="ai-suggestion-modal"
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
        <Box
          sx={boxStyle}
          id="ai-suggestion-modal"
          role="dialog"
          aria-modal="true"
          tabIndex={-1}
        >
          <Typography
            id="ai-suggestion-title"
            variant="h6"
            mb={2}
            fontWeight={600}
            borderBottom={1}
            borderColor="divider"
          >
            {t("aiInfo.suggestion")}
          </Typography>
          {loading && (
            <Stack direction="row" alignItems="center" spacing={2} mb={2}>
              <CircularProgress size={20} />
              <Typography>{t("aiInfo.generatingSuggestion")}</Typography>
            </Stack>
          )}

          {error && (
            <Typography
              color="error.main"
              role="alert"
              mb={2}
              p={1.5}
              bgcolor="#ffe5e5"
              borderRadius={1}
              boxShadow={1}
            >
              {t(error)}
            </Typography>
          )}

          {isEditing ? (
            <TextField
              fullWidth
              multiline
              minRows={4}
              value={popupText}
              onChange={(e) => setPopupText(e.target.value)}
              autoFocus
              aria-label={t("aiInfo.edit")}
            />
          ) : (
            <Typography id="ai-suggestion-description" mb={3} component="div" whiteSpace="pre-line">
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
              onClick={handleAccept}
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
});

export default AiSuggestionPopup;
