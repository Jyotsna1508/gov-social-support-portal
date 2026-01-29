
export interface AiStreamParams {
  prompt: string;
  model?: string;
  temperature?: number;
  onToken: (token: string) => void;
  onError?: (errorMessage: string) => void;
  signal?: AbortSignal;
}

export interface CoreFetchOptions extends RequestInit {
  path: string;
  signal?: AbortSignal;
}

export type FieldName = "currentSituation" | "employmentCircumstances" | "reasonForApplying";

export interface AiSuggestionPopupProps {
  fieldName: string;
  onAccept: (fieldName: string, suggestion: string) => void;
}

export interface RootState {
  financial: Record<string, unknown>;
}
