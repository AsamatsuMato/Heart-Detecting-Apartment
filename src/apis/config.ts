// 请求接口
let url_config = ""; //请求后端的地址
let web_url = ""; //网页跳转的地址
let picserver = ""; //陪护人图片地址，管理后台后端
if (process.env.NODE_ENV === "development") {
  // 开发环境
  // #ifdef H5
  url_config = "/api"; // 配置跨域代理后的测试环境地址
  // #endif
  // #ifndef H5
  url_config = "https://gzfy.wedone.net.cn:8090/web-api-t/chsp/"; //测试环境地址
  // #endif
  // url_config = 'https://www.fastmock.site/mock/7ca5ff2155fb3db797605348dbb0ef9b/chsp'// mock地址
  // url_config = 'http://127.0.0.1:8010/chsp'
  // url_config = 'https://gzfy.wedone.net.cn/web-api/chsp/'//正式环境地址
  // url_config = 'http://192.168.50.142:8010/chsp'
  // url_config = 'https://gzfy.wedone.net.cn/web-api/chsp/'//正式环境地址
  web_url = "http://192.168.50.142:8087/chsp";
  picserver = "http://113.107.157.202:8090/testAdminApi/carePhoto/";
  // url_config = 'https://gzzy.wedone.net.cn/wxappStg/chsp'
  // web_url = 'https://gzzy.wedone.net.cn/wxappStg/chsp'
} else {
  // 生产环境
  // url_config = 'https://gzfy.wedone.net.cn'//正式环境地址
  url_config = "https://gzfy.wedone.net.cn:8090/web-api-t/chsp/"; //测试环境地址
  // url_config = 'http://192.168.50.142:8010/chsp'
  web_url = "https://gzfy.wedone.net.cn/admin/web/api";
  picserver = "http://113.107.157.202:8090/testAdminApi/carePhoto/";
}

export default {
  web_url,
  url_config,
  picserver,
};
