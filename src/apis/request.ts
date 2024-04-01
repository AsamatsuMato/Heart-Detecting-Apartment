import { url_config } from "./config"; //路径地址

const request = (url: any, method: any, data?: any, header = {}) => {
  return new Promise((resolve, reject) => {
    uni.showLoading({
      mask: true,
      title: "请求中...",
    });
    uni.request({
      url: `${url_config}${url}`,
      method,
      header: {
        "content-type": "application/json",
        ...header,
        token: uni.getStorageSync("token"),
      },
      data,
      success: (res: any) => {
        const { code, data, msg } = res.data;
        if (code === 200) {
          resolve(data);
        } else if (code === 1001 || code === 1002) {
          // 1001 状态码为 token 缺失，1002 状态码为 token 过期，校验失败
          uni.showToast({
            title: "登录授权失效, 请重新登录",
            icon: "none",
          });
          uni.removeStorageSync("avatar");
          uni.removeStorageSync("nickName");
          uni.removeStorageSync("token");
          uni.reLaunch({
            url: "/pages/login/index",
          });
        } else {
          uni.showToast({
            title: msg,
            icon: "none",
          });
          reject(msg);
        }
      },
      fail: (err: any) => {
        console.log(err);
        uni.showToast({
          title: "请求错误",
          icon: "error",
        });
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};

export default request;
