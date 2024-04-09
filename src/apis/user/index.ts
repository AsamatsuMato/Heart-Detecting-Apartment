import request from "../request";

export function getUserInfoApi() {
  return request("/hda/user/getUserInfo", "GET");
}
