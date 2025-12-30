
export type BristolType = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export interface ImagingNode {
  data: string; // base64
  mimeType: string;
  type: 'radiology' | 'endoscopy' | 'morphology' | 'lab_report';
}

export interface ScreeningData {
  age: string;
  sex: 'male' | 'female' | 'other';
  painFrequency: number;
  painDurationMonths: number;
  bloatingSeverity: number;
  stoolType: BristolType;
  stressLevel: number;
  dietQuality: string;
  imagingNodes: ImagingNode[];
  acousticFrequency?: number;
  breathVocSignature?: string;
  pastDiagnoses: string;
  previousProcedures: string[];
  medications: string;
}

export interface AnalysisResult {
  likelihoodScore: number;
  confidenceScore: number;
  neuralWeights: {
    radiologicalPattern: number;
    endoscopicFindings: number;
    historicalContext: number;
    clinicalMarkers: number;
  };
  imagingFindings: {
    label: string;
    description: string;
    severity: 'normal' | 'notable' | 'abnormal';
  }[];
  historicalInsight: string;
  logicChain: string[];
  recommendation: string;
  interpretation: string;
}
