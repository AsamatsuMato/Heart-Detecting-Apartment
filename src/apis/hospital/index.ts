import request from "../request";

export function getHospitalInfoApi() {
  return request("/hda/hospital/getHospitalInfo", "GET");
}
