
import { GoogleGenAI } from "@google/genai";
import { ClinicalData } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

export const generateClinicalSummary = async (data: ClinicalData): Promise<string> => {
    
  const prompt = `
    Analyze the following clinical data for a patient and provide a brief, easy-to-understand summary highlighting potential risk factors for cognitive decline, based on established medical knowledge. 
    DO NOT provide a diagnosis or medical advice. The summary should be neutral and informative for a medical professional. 
    Focus on how the values (e.g., MMSE, CDR) relate to typical benchmarks.

    Clinical Data:
    - Age: ${data.age}
    - Sex: ${data.sex}
    - Mini-Mental State Examination (MMSE) Score: ${data.mmse} (out of 30)
    - Clinical Dementia Rating (CDR) Score: ${data.cdr}
    - Estimated Total Intracranial Volume (eTIV): ${data.etiv}
    - Normalized Whole Brain Volume (nWBV): ${data.nwbv}
    - Atlas Scaling Factor (ASF): ${data.asf}

    Begin the summary with "Patient presents with..."
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating clinical summary with Gemini:", error);
    return "Could not generate AI summary at this time.";
  }
};
