import {url_config} from "./config"; //路径地址

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
      },
      data,
      success: (res: any) => {
        if (res.data.code === 200) {
          resolve(res.data.data);
        } else {
          reject(res.data.msg);
        }
      },
      fail: (err: any) => {
        console.log(err);
        reject(err);
      },
      complete() {
        uni.hideLoading();
      },
    });
  });
};

export default request;
