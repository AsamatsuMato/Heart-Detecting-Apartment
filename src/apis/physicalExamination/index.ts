import request from "../request";
import {
  type BookPhysicalExaminationInter,
  type PhyExaPaymentInter,
  type CancelPhyExaAppointmentInter,
} from "./types";

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

export function getReservedListApi(status?: number) {
  return request(
    `/hda/package/getReservedList${status ? `?status=${status}` : ""}`,
    "GET"
  );
}

export function getReservedDetailsApi(phyExaCode: string) {
  return request(
    `/hda/package/getReservedDetails?phyExaCode=${phyExaCode}`,
    "GET"
  );
}

export function phyExaPaymentApi(data: PhyExaPaymentInter) {
  return request("/hda/order/phyExaPayment", "POST", data);
}

export function cancelPhyExaAppointmentApi(data: CancelPhyExaAppointmentInter) {
  return request("/hda/package/cancelPhyExaAppointment", "POST", data);
}
