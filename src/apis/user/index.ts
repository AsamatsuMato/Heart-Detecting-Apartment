import request from "../request";

export function getUserInfoApi() {
  return request("/hda/user/getUserInfo", "GET");
}

export function settingPaymentPwdApi(data: { paymentPwd: string }) {
  return request("/hda/user/settingPaymentPwd", "POST", data);
}
