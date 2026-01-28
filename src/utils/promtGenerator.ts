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
      prompt = "Help me describe my financial situation. ";

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
      prompt = "Help me describe my employment circumstances. ";

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
      prompt = "Explain my reason for applying. ";

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
