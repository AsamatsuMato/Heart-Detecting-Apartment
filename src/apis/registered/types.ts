export interface ConfirmRegisteredInter {
  docCode: string;
  date: string;
  timePeriod: string;
  price: number;
  medicalCardNo: string;
}

export interface GetRegisteredRecordInter {
  medicalCardNo: string;
  regCode?: string;
  status?: number;
}
