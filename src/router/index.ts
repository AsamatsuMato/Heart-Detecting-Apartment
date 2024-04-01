import { pages } from "@/pages.json";

const token = uni.getStorageSync("token");
console.log(token);

function navigateTo(url: string) {
  const route = pages.find((item: any) => {
    return `/${item.path}` === url;
  });

  if (route?.meta?.auth) {
    if (token) {
      uni.navigateTo({
        url,
      });
    } else {
      uni.reLaunch({
        url: "/pages/login/index",
      });
    }
  } else {
    uni.navigateTo({
      url,
    });
  }
}

function reLaunch(url: string) {
  const route = pages.find((item: any) => {
    return `/${item.path}` === url;
  });

  if (route?.meta?.auth) {
    if (token) {
      uni.reLaunch({
        url,
      });
    } else {
      uni.reLaunch({
        url: "/pages/login/index",
      });
    }
  } else {
    uni.reLaunch({
      url,
    });
  }
}

export { navigateTo, reLaunch };
