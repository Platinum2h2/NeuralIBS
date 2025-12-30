
import { GoogleGenAI, Type } from "@google/genai";
import { ScreeningData, AnalysisResult } from "../types";

export async function analyzeIBSLikelihood(data: ScreeningData): Promise<AnalysisResult> {
  // Utilizing gemini-3-flash-preview for ultra-fast multimodal synthesis and reasoning.
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const textPrompt = `
    ACT AS: A Senior Clinical Bio-Informatician and Neurogastroenterology Lead.
    TASK: Perform a Decisive Multi-Modal Analysis for Phenotypic Alignment with Irritable Bowel Syndrome (IBS).

    CLINICAL PHILOSOPHY: 
    - You are measuring how closely this patient's data fits the "Textbook IBS Pattern."
    - 0% = Clear organic pathology (e.g., Active IBD, Celiac) with NO functional characteristics.
    - 100% = Perfect Rome IV criteria match with extensive negative workup (clean scans/labs).
    - DECISIVE SCORING: If the pattern is strong, use high numbers (e.g., 70-100%). Do not default to middle-ground or miniscule decimals.
    
    ADDITIVE LOGIC (CRITICAL):
    - The likelihoodScore is the TOTAL pattern match (e.g., 85).
    - The four neuralWeights (radiologicalPattern, endoscopicFindings, historicalContext, clinicalMarkers) MUST sum exactly to the likelihoodScore.
    - Example: If likelihoodScore is 80, weights might be [20, 20, 25, 15].
    - DO NOT return miniscule fractions like 0.45% unless the total score is near 0.

    PATIENT DATA:
    - Past Diagnoses: ${data.pastDiagnoses}
    - Previous Procedures: ${data.previousProcedures.join(", ")}
    - Medications: ${data.medications}
    - Pain: ${data.painFrequency} days/week.
    - Stool: Bristol Type ${data.stoolType}.
    - Acoustics: ${data.acousticFrequency} BPM.
    - VOC: ${data.breathVocSignature}.

    NEURAL VISION INSTRUCTIONS:
    1. Analyze images for ABSENCE of inflammation. Normal morphology + High pain = STRONG IBS pattern.

    OUTPUT JSON SCHEMA:
    {
      "likelihoodScore": number,
      "confidenceScore": number,
      "neuralWeights": { 
        "radiologicalPattern": number, 
        "endoscopicFindings": number, 
        "historicalContext": number, 
        "clinicalMarkers": number 
      },
      "imagingFindings": [{ "label": string, "description": string, "severity": "normal"|"notable"|"abnormal" }],
      "historicalInsight": "Synthesis",
      "logicChain": ["Reason 1", "Reason 2", "Reason 3"],
      "recommendation": "Next steps",
      "interpretation": "Summary"
    }
  `;

  const parts: any[] = [{ text: textPrompt }];

  data.imagingNodes.forEach(node => {
    parts.push({
      inlineData: {
        data: node.data,
        mimeType: node.mimeType
      }
    });
  });

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: { parts },
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          likelihoodScore: { type: Type.NUMBER, description: "Total match percentage 0-100" },
          confidenceScore: { type: Type.NUMBER },
          neuralWeights: {
            type: Type.OBJECT,
            properties: {
              radiologicalPattern: { type: Type.NUMBER, description: "Points contributed by radiology" },
              endoscopicFindings: { type: Type.NUMBER, description: "Points contributed by endoscopy/vision" },
              historicalContext: { type: Type.NUMBER, description: "Points contributed by history" },
              clinicalMarkers: { type: Type.NUMBER, description: "Points contributed by symptoms/biomarkers" }
            },
            required: ["radiologicalPattern", "endoscopicFindings", "historicalContext", "clinicalMarkers"]
          },
          imagingFindings: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                label: { type: Type.STRING },
                description: { type: Type.STRING },
                severity: { type: Type.STRING }
              },
              required: ["label", "description", "severity"]
            }
          },
          historicalInsight: { type: Type.STRING },
          logicChain: { type: Type.ARRAY, items: { type: Type.STRING } },
          recommendation: { type: Type.STRING },
          interpretation: { type: Type.STRING }
        },
        required: ["likelihoodScore", "confidenceScore", "neuralWeights", "imagingFindings", "historicalInsight", "logicChain", "recommendation", "interpretation"]
      }
    }
  });

  const responseText = response.text?.trim();
  if (!responseText) throw new Error("Neural core response failure.");

  try {
    const parsed = JSON.parse(responseText);
    // Ensure the AI followed the additive logic (just in case of model drift)
    const sum = parsed.neuralWeights.radiologicalPattern + 
                parsed.neuralWeights.endoscopicFindings + 
                parsed.neuralWeights.historicalContext + 
                parsed.neuralWeights.clinicalMarkers;
    
    // Safety adjustment if sum is slightly off (floating point or model error)
    if (Math.abs(sum - parsed.likelihoodScore) > 0.1 && sum > 0) {
       const factor = parsed.likelihoodScore / sum;
       parsed.neuralWeights.radiologicalPattern = parseFloat((parsed.neuralWeights.radiologicalPattern * factor).toFixed(1));
       parsed.neuralWeights.endoscopicFindings = parseFloat((parsed.neuralWeights.endoscopicFindings * factor).toFixed(1));
       parsed.neuralWeights.historicalContext = parseFloat((parsed.neuralWeights.historicalContext * factor).toFixed(1));
       parsed.neuralWeights.clinicalMarkers = parseFloat((parsed.neuralWeights.clinicalMarkers * factor).toFixed(1));
    }

    return parsed;
  } catch (error) {
    throw new Error("Logic synthesis parsing error.");
  }
}
