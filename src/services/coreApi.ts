import type { CoreFetchOptions } from "../types/ai";

const OPENAI_API_KEY = import.meta.env.VITE_REACT_APP_OPENAI_API_KEY;

const BASE_URL = "https://api.openai.com/v1";

/**
 * Centralized fetch function with API key
 */
export const coreFetch = async ({ path, ...options }: CoreFetchOptions) => {
  const response = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API Error: ${response.status} ${errorText}`);
  }

  return response;
};
