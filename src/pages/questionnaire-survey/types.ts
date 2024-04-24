export interface QuestionnaireListInter {
  options: Array<{
    key: string;
    value: string;
    isActive: boolean;
  }>;
  qCode: string;
  question: string;
}
