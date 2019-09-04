// taro toast增强
import Taro from '@tarojs/taro'

const DURATION = 2000

/**
 * 显示loading
 * @param message 可选内容
 */
function Loading (message:string = ''){
    Taro.showLoading({
        title: message,
        mask:true
    })
}

namespace Loading {
    /**
     * 关闭loading
     */
    export function hide(){
        Taro.hideLoading()
    }
    /**
     * 显示loading
     * @param message 可选内容
     */
    export function show(message:string = ''){
        Loading(message)
    }
}

/**
 * 显示toast
 * @param message 内容
 * @param duration 持续时间
 */
function Toast (message:string,duration = DURATION){
    Taro.showToast({
        title: message,
        icon: 'none',
        duration: duration
    })
}

namespace Toast {
    /**
     * 显示success toast
     * @param message 内容
     * @param duration 持续时间
     */
    export function success (message:string,duration = DURATION){
        Taro.showToast({
            title: message,
            icon: 'success',
            duration: duration
        })
    }
    /**
     * 显示error toast
     * @param message 内容
     * @param duration 持续时间
     */
    export function error (message:string,duration = DURATION){
        Taro.showToast({
            title: message,
            //Taro.showToast icon仅支持none,loading,success三种，这里使用image来拓展error图标
            image: require('../../src/assets/icon/setting.png'),
            duration: duration
        })
    }
}
export let toast = Toast
export let loading = Loading


