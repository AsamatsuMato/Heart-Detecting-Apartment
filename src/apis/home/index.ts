import request from "../request";

export function getCarouselApi() {
  return request("/hda/home/getCarousel", "GET");
}
