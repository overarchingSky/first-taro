import { storage } from '../utils/storage';
import { store } from './../store/index';
import thunkMiddleware from 'redux-thunk'
import { login } from './action'
import { toast } from '../utils/toast';

export class Auth {
    static setLogin: Taro.Dispatch<Taro.SetStateAction<boolean>>
    constructor(options:obj){
        
    }
    /**
     * 登录
     * @param params 登录参数
     */
    login = async function(params?:obj){
        try {
            await thunkMiddleware(store)(store.dispatch)(login(params))
            storage.set('$_login',true)
        } catch (error) {
            toast.error(error)
        }
       
    }

    /**
     * 登出
     */
    logout = function (){
        //清除登录状态
        Auth.setLogin(false)
        storage.set('$_login',false)
    }

    /**
     * 存/取用户数据
     * 传入data参数为更新，不传为获取用户信息
     * @param data 新的用户数据
     */
    user = async function (data?:obj){
        try {
            if(data){
                //调用接口更新用户数据
                await storage.set('$_user',data)
                return data
            }
            let userInfo = await storage.get('$_user')
            return userInfo
        } catch (error) {
            return Promise.reject(error)
        }
    }
    /**
     * 是否已登录
     */
    hasLogined = async function(){
        const logined = (await storage.get('$_login')) === 'true'
        return logined
    }
    /**
     * 是否允许自动登录
     */
    autoLogin = async function(){
        const autoLogin = (await storage.get('$_autoLogin')) === 'true'
        return autoLogin
    }
}

