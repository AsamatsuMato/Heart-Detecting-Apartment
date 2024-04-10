import request from "../request";
import { type DialysisPrepaymentInter } from "./types";

export function dialysisPrepaymentApi(data: DialysisPrepaymentInter) {
  return request("/hda/order/dialysisPrepayment", "POST", data);
}

export function getPrepaymentRecordListApi() {
  return request("/hda/order/getPrepaymentRecordList", "GET");
}

export function deletePrepaymentRecordApi(orderCode: string) {
  return request(
    `/hda/order/deletePrepaymentRecord?orderCode=${orderCode}`,
    "GET",
  );
}
