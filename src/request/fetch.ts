import { Url } from './../utils/url';
import { Content_Type } from './content-type';
import { error } from './../utils/log';
//import serve from ''
import Taro from '@tarojs/taro'
let serve = {
    baseUrl:'https://lbmall.happy-gene.com'
}
export function fetch(params:obj, method:Methods = 'GET', extra = {}) : Promise<any> {
    let { url, data } = params
    let header = {
        token:''
    }
    if (method === 'POST') {
        header['content-type'] = Content_Type.JSON
    }
    header = {
        ...header,
        ...extra
    }
    const option = {
        isShowLoading: false,
        url:  Url.isFullPath(url) ? url : Url.join(serve.baseUrl, url),
        data: data,
        method: method,
        header,
        success(res) {

        },
        error(e) {
            error('api', '请求接口出现问题', e)
        }
    }
    return Taro.request(option)
}