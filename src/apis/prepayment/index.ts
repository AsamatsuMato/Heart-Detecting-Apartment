import request from "../request";
import { type DialysisPrepaymentInter } from "./types";

export function dialysisPrepaymentApi(data: DialysisPrepaymentInter) {
  return request("/hda/order/dialysisPrepayment", "POST", data);
}
