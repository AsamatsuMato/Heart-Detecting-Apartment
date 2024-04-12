import request from "../request";
import { type BookPhysicalExaminationInter } from "./types";

export function getPhysicalExaminationListApi(packageCode?: string) {
  return request(
    `/hda/package/getPhysicalExaminationList${
      packageCode ? `?packageCode=${packageCode}` : ""
    }`,
    "GET"
  );
}

export function getPhyExaSchedulingApi() {
  return request("/hda/package/getPhyExaScheduling", "GET");
}

export function bookPhysicalExaminationApi(data: BookPhysicalExaminationInter) {
  return request("/hda/package/bookPhysicalExamination", "POST", data);
}
