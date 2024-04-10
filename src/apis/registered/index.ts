import request from "../request";
import {
  type ConfirmRegisteredInter,
  type GetRegisteredRecordInter,
  type RegisteredPaymentInter,
} from "./types";

export function getDepartmentListApi() {
  return request("/hda/department/getDepartmentList", "GET");
}

export function getRegisteredConfirmInfoApi(docCode: string) {
  return request(
    `/hda/registered/getRegisteredConfirmInfo?docCode=${docCode}`,
    "GET",
  );
}

export function confirmRegisteredApi(data: ConfirmRegisteredInter) {
  return request("/hda/registered/confirmRegistered", "POST", data);
}

export function getRegisteredRecordApi(data: GetRegisteredRecordInter) {
  return request("/hda/registered/getRegisteredRecord", "POST", data);
}

export function getRegStatusListApi() {
  return request("/hda/registered/getRegStatusList", "GET");
}

export function cancelAppointmentApi(regCode: string) {
  return request(`/hda/registered/cancelAppointment?regCode=${regCode}`, "GET");
}

export function registeredPaymentApi(data: RegisteredPaymentInter) {
  return request("/hda/order/registeredPayment", "POST", data);
}
