import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Button, Modal, Box, Typography, Stack } from "@mui/material";

interface AiSuggestionPopupProps {
  fieldName: string;
  onAccept: (suggestion: string) => void;
}
const boxStyle = {
  position: "absolute" as const,
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  bgcolor: "background.paper",
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
  width: { xs: "90%", sm: 400 },
};
const AiSuggestionPopup: React.FC<AiSuggestionPopupProps> = ({
  fieldName,
  onAccept,
}) => {
  const { t } = useTranslation();
  const [popupText, setPopupText] = useState<string | null>(null);

  const handleHelpMeWrite = () => {
    // TODO: replace with OpenAI GPT API call
    setPopupText(`Sample suggestion for ${fieldName}`);
  };

  const handleClose = () => setPopupText(null);

  return (
    <>
      {/* Trigger button */}
      <Button
        variant="contained"
        color="primary"
        onClick={handleHelpMeWrite}
        sx={{ p: 1 }}
      >
        {t("aiInfo.helpMeWrite")}
      </Button>

      {/* Modal */}
      <Modal
        open={!!popupText}
        onClose={handleClose}
        aria-labelledby="ai-suggestion-title"
        aria-describedby="ai-suggestion-description"
        closeAfterTransition
      >
        <Box sx={boxStyle}>
          <Typography id="ai-suggestion-title" variant="h6" mb={2}>
            {t("step3.suggestion")}
          </Typography>
          <Typography id="ai-suggestion-description" mb={3}>
            {popupText}
          </Typography>

          <Stack direction="row" spacing={2} justifyContent="flex-end">
            <Button variant="outlined" color="inherit" onClick={handleClose}>
              {t("aiInfo.discard")}
            </Button>
            <Button
              variant="contained"
              color="success"
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
              onClick={() => {
                // TODO: edit in popup
                handleClose();
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
