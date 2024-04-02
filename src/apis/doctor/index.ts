import request from "../request";
import { type GetDoctorListInter } from "./types";

export function getDoctorListApi(data: GetDoctorListInter) {
  return request("/hda/doctor/getDoctorList", "POST", data);
}

export function getDoctorInfoApi(docCode: string) {
  return request(`/hda/doctor/getDoctorInfo?docCode=${docCode}`, "GET");
}
