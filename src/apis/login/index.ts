import request from "../request";
import { authorizedAccessTokenInter } from "./types.js";

export function authorizedAccessTokenApi(data: authorizedAccessTokenInter) {
  return request("/hda/login/authorizedAccessToken", "POST", data);
}
