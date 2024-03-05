import config from './config.js' //路径地址

const request = (url: any, method: any, data: any, header = {}) => {
	return new Promise((resolve, reject) => {
		uni.showLoading({
			mask: true,
			title: "请求中..."
		})
		uni.request({
			url: `${config.url_config}${url}`,
			method,
			header: {
				"content-type": "application/json",
				...header
			},
			data,
			success: (res: any) => {
				if(res.data.code === 0) {
					resolve(res.data);
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
			}
		})
	})
}

export default request