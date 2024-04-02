// 请求接口
let url_config = ""; //请求后端的地址
if (process.env.NODE_ENV === "development") {
  // 开发环境
  url_config = "http://192.168.31.126:9999"; // 本地后端地址
  // url_config = 'http://192.168.51.71:9999'; // 公司本地后端地址
} else {
  // 生产环境
  url_config = "http://192.168.31.126:9999"; // 本地后端地址
  // url_config = 'http://192.168.51.71:9999'; // 公司本地后端地址
}

export { url_config };
