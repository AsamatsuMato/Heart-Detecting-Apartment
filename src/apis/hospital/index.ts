import request from "../request.js";

export function getHospitalInfoApi() {
  return request("/hda/hospital/getHospitalInfo", "GET");
}
