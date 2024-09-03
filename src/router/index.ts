import { pages } from "@/pages.json";

function navigateTo(url: string) {
  const route = pages.find((item: any) => {
    return `/${item.path}` === url;
  });

  const token = my.getStorageSync({ key: "token" });
  const medicalCardNo = my.getStorageSync({ key: "medicalCardNo" });

  if (route?.meta?.auth) {
    if (token.data) {
      if (medicalCardNo.data || route.meta.noBind) {
        uni.navigateTo({
          url,
        });
      } else {
        uni.reLaunch({
          url: "/pages/patient-management/add-patient/index",
        });
        uni.showToast({
          title: "请先添加就诊人",
        });
      }
    } else {
      uni.reLaunch({
        url: "/pages/login/index",
      });
      uni.showToast({
        title: "请先进行登录授权",
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

  const token = my.getStorageSync({ key: "token" });
  const medicalCardNo = my.getStorageSync({ key: "medicalCardNo" });

  if (route?.meta?.auth) {
    if (token.data) {
      if (medicalCardNo.data || route.meta.noBind) {
        uni.reLaunch({
          url,
        });
      } else {
        uni.reLaunch({
          url: "/pages/patient-management/add-patient/index",
        });
        uni.showToast({
          title: "请先添加就诊人",
        });
      }
    } else {
      uni.reLaunch({
        url: "/pages/login/index",
      });
      uni.showToast({
        title: "请先进行登录授权",
      });
    }
  } else {
    uni.reLaunch({
      url,
    });
  }
}

export { navigateTo, reLaunch };
