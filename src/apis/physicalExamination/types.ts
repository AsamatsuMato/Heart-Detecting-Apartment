export interface BookPhysicalExaminationInter {
  date: string;
  packageCode: string;
  packageName: string;
  price: number;
  name: string;
  idCard: string;
  birthday: string;
  phone: string;
  gender: number;
  maritalStatus: number;
  birthPlace: string;
  pastMedicalHistoryContent?: string;
  allergicHistoryContent?: string;
}

export interface PhyExaPaymentInter {
  phyExaCode: string;
  price: number | undefined;
  paymentPwd: string;
}
