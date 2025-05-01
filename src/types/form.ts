export interface CaseEvaluationFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  caseType: string;
  exposurePeriod: string;
  medicalCondition: string;
  additionalInfo: string;
  agreeToTerms: boolean;
  ipAddress?: string;
  userAgent?: string;
  submittedAt?: Date;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message: string;
  caseType: string;
  ipAddress?: string;
  userAgent?: string;
  submittedAt?: Date;
}

export interface FormStatus {
  type: 'success' | 'error' | '';
  message: string;
}
