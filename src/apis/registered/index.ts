import request from "../request";
// import { type AddPatientInter } from "./types";

export function getDepartmentListApi() {
  return request("/hda/department/getDepartmentList", "GET");
}
