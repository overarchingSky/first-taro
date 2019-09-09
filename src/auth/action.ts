
import Taro from '@tarojs/taro';
import { platforms } from '../utils/platform';

import { fetch } from '../request/fetch';

import { $auth } from '.';

// 提供平台统一的login action
export const login = (data?:obj) => {
    return async dispatch => {
        let res
        switch (process.env.TARO_ENV) {
            case platforms .微信小程序:
                res = await Taro.login(data)
                //根究res中的code去后端交换token，前端将token存下来
                // 未完待续 。。。
                break;
            case platforms.h5:
                //return thunkMiddleware (store)(store.dispatch)(actions.login(args))
                res = await fetch({url:'/auth/login',data},'POST')
                break;
            default:
                break;
        }
        await dispatch(apiGetUserInfo())
    }
}

export const apiGetUserInfo = (data?:obj) => {
    return async dispatch => {
        let userInfo = await fetch({url:'/mallsales/api/user/current-mall-user'},'GET')
        $auth.user(userInfo)
    }
}