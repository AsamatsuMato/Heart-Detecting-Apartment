import request from "../request";
import { type ConfirmRegisteredInter } from "./types";

export function getDepartmentListApi() {
  return request("/hda/department/getDepartmentList", "GET");
}

export function getRegisteredConfirmInfoApi(docCode: string) {
  return request(
    `/hda/registered/getRegisteredConfirmInfo?docCode=${docCode}`,
    "GET"
  );
}

export function confirmRegisteredApi(data: ConfirmRegisteredInter) {
  return request("/hda/registered/confirmRegistered", "POST", data);
}
