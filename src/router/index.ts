import { pages } from "@/pages.json";

function navigateTo(url: string) {
  const route = pages.find((item: any) => {
    return `/${item.path}` === url;
  });

  const { data } = my.getStorageSync({ key: "token" });

  if (route?.meta?.auth) {
    if (data) {
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

  const { data } = my.getStorageSync({ key: "token" });

  if (route?.meta?.auth) {
    if (data) {
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
