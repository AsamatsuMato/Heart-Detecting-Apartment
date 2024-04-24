import request from "../request";

export function getUserInfoApi() {
  return request("/hda/user/getUserInfo", "GET");
}

export function settingPaymentPwdApi(pwd: string) {
  return request(`/hda/user/settingPaymentPwd?pwd=${pwd}`, "GET");
}
