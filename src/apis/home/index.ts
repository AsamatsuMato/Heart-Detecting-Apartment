import request from "../request.js";

export function getCarouselApi() {
  return request("/hda/home/getCarousel", "GET");
}
