import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface PersonDetails {
  name: string;
  gender: "Male" | "Female";
  age: number;
  education: number; // 0-5
  employment: number; // 0-2
  income: number; // 0-2
  clan: string;
  autonomy: number; // 1-5
  parentalInfluence: number; // 1-5
  clanApproval: number; // 1-5
}

export interface RecommendationResult {
  score: number;
  category: string;
  strengths: string[];
  concerns: string[];
  explanation: string;
}

export async function getCompatibility(personA: PersonDetails, personB: PersonDetails): Promise<RecommendationResult> {
  const model = ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: `
      Act as a specialized Spouse Recommendation System for Hargeisa, Somaliland, based on the following MSc thesis findings:
      
      THESIS FINDINGS:
      - Primary Predictors of Divorce (Risk Factors): Low Spouse Choice Autonomy (19.0%), High Clan Approval Requirement (17.8%), High Parental Influence (16.4%).
      - Secondary Predictors: Young Age at Marriage, Low Income, Low Education, Unemployment.
      - Integration Rules for Potential Couples:
        - Age: Average of both.
        - Age at Marriage: Minimum of both.
        - Education: Minimum of both.
        - Employment: Maximum vulnerability (Unemployed > Self > Employed).
        - Income: Maximum capacity (High > Middle > Low).
        - Clan: Same clan is a protective factor (+8.4%), Different clan is a risk (-7.2%).
        - Autonomy: Minimum of both (Low autonomy in one partner overrides the other).
        - Parental Influence: Maximum of both (High interference from one side affects the union).
        - Clan Approval: Maximum of both.

      SCORING CATEGORIES:
      - 85-100%: Very High Compatibility
      - 70-84%: Good Compatibility
      - 50-69%: Moderate Compatibility
      - Below 50%: Low Compatibility

      COUPLE DATA:
      Person A: ${JSON.stringify(personA)}
      Person B: ${JSON.stringify(personB)}

      Calculate a compatibility score (0-100) and provide a professional analysis.
    `,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          score: { type: Type.NUMBER },
          category: { type: Type.STRING },
          strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
          concerns: { type: Type.ARRAY, items: { type: Type.STRING } },
          explanation: { type: Type.STRING }
        },
        required: ["score", "category", "strengths", "concerns", "explanation"]
      }
    }
  });

  const response = await model;
  return JSON.parse(response.text || "{}");
}
