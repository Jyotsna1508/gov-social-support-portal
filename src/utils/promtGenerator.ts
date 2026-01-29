/**
 * Generates a prompt string based on the user's financial data and a specific field name.
 *
 * @param {Object} financialData - The user's financial information.
 * @param {string} financialData.maritalStatus - The marital status of the user (e.g., 'single', 'married').
 * @param {number} financialData.dependents - The number of dependents the user has.
 * @param {string} financialData.employmentStatus - The employment status of the user (e.g., 'employed', 'unemployed').
 * @param {number|string} financialData.monthlyIncome - The user's monthly income. Can be a number or numeric string.
 * @param {string} financialData.housingStatus - The housing situation of the user (e.g., 'owned', 'rented').
 * @param {string} fieldName - The specific field for which the prompt is being generated.
 *
 * @returns {string} A string containing the generated prompt based on the financial data and field name.
 */
export const generatePrompt = (
  financialData: {
    maritalStatus: string;
    dependents: number;
    employmentStatus: string;
    monthlyIncome: number | string;
    housingStatus: string;
  },
  fieldName: string
) => {
  let prompt = "";
  const income = parseInt(financialData.monthlyIncome as string, 10) || 0;
  switch (fieldName) {
    case "situationInfo.currentSituation":
      if (financialData.employmentStatus === "unemployed") {
        prompt += "I am unemployed";
      } else if (financialData.employmentStatus === "employed") {
        prompt += "I am employed";
      } else if (financialData.employmentStatus === "self-employed") {
        prompt += "I am self-employed";
      }

      if (income === 0) {
        prompt += " with no income.";
      } else {
        prompt += ` with a monthly income of $${income}.`;
      }

      if (financialData.dependents && financialData.dependents > 0) {
        prompt += ` I have ${financialData.dependents} dependent${financialData.dependents > 1 ? "s" : ""}.`;
      }

      if (financialData.housingStatus) {
        prompt += ` I live in ${financialData.housingStatus} house.`;
      }

      prompt += " Please write a concise paragraph describing my financial hardship in a professional tone.";
      break;

    case "situationInfo.employmentCircumstances":
      if (financialData.employmentStatus === "unemployed") {
        prompt += "I am currently unemployed";
      } else if (financialData.employmentStatus === "employed") {
        prompt += `I am employed with a monthly income of $${income}`;
      } else if (financialData.employmentStatus === "self-employed") {
        prompt += `I am self-employed earning $${income} monthly`;
      }

      prompt += ". Please write a professional description of my current employment situation.";
      break;

    case "situationInfo.reasonForApplying":
      if (income === 0) {
        prompt += "I am applying because I have no income and need financial assistance.";
      } else {
        prompt += "I am applying to improve my financial stability and support my dependents.";
      }

      prompt += " Make it concise and professional.";
      break;

    default:
      prompt = "Help me describe my situation in a professional manner.";
  }

  return prompt;
};
