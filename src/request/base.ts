import serve from ''
import Taro from '@tarojs/taro'
export function baseOptions(params:obj, method:Methods = 'GET') : Promise<any> {
    let { url, data } = params
    let contentType = 'application/x-www-form-urlencoded'
    contentType = params.contentType || contentType
    const option = {
        isShowLoading: false,
        url: serve.baseUrl + url,
        data: data,
        method: method,
        header: { 'content-type': contentType, 'token': 'token' }, // 默认contentType ,预留token
        success(res) {

        },
        error(e) {
            logError('api', '请求接口出现问题', e)
        }
    }
    return Taro.request(option)
}