import request from "../request";
import { type AddPatientInter } from "./types";

export function getPatientInfoApi() {
  return request("/hda/patient/getPatientInfo", "GET");
}

export function addPatientApi(data: AddPatientInter) {
  return request("/hda/patient/addPatient", "POST", data);
}

export function deletePatientApi(medicalCardNo: string) {
  return request(
    `/hda/patient/deletePatient?medicalCardNo=${medicalCardNo}`,
    "GET"
  );
}
