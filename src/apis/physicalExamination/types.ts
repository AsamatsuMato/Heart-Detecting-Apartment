export interface BookPhysicalExaminationInter {
  date: string;
  packageCode: string;
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
