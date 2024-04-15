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

export interface RegisteredPaymentInter {
  regCode: string;
  price: number;
  paymentPwd: string;
}

export interface CancelAppointmentInter {
  regCode: string;
  date: string;
  docCode: string;
  timePeriod: string;
}
