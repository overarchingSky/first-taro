import Taro from '@tarojs/taro';

export const log = console.log
export const error = console.error
export const warn = console.warn
export const reportError = function(...info:any[]){
    try {
        let deviceInfo = Taro.getSystemInfoSync() // 这替换成 taro的
        const device = JSON.stringify(deviceInfo)
        const reportContent = JSON.stringify(info)
        //调用接口上报日志
        // ...
    } catch (err) {
        console.error('not support getSystemInfoSync api', err.message)
    }
    console.error(info)
}