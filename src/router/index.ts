import { pages } from "@/pages.json";

function navigateTo(url: string) {
  const route = pages.find((item: any) => {
    return `/${item.path}` === url;
  });

  const token = my.getStorageSync({ key: "token" });
  const medicalCardNo = my.getStorageSync({ key: "medicalCardNo" });

  if (route?.meta?.auth) {
    if (token.data) {
      if (medicalCardNo.data) {
        uni.navigateTo({
          url,
        });
      } else {
        uni.reLaunch({
          url: "/pages/patient-management/add-patient/index",
        });
      }
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

  const token = my.getStorageSync({ key: "token" });
  const medicalCardNo = my.getStorageSync({ key: "medicalCardNo" });

  if (route?.meta?.auth) {
    if (token.data) {
      if (medicalCardNo.data) {
        uni.reLaunch({
          url,
        });
      } else {
        uni.reLaunch({
          url: "/pages/patient-management/add-patient/index",
        });
      }
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
