import { Auth } from './Auth';
import Taro, { useEffect, useState } from '@tarojs/taro';
import { loading, toast } from '../utils/toast';

export const $auth = new Auth({
    //配置接口action
    fetch:{
        login:'/auth/login',
        logout:'',
        user:''
    }
})

export async function useLogin(){
    let isLogin:boolean = await $auth.hasLogined()
    let auto_login:boolean = await $auth.autoLogin()
    let [ login, setLogin] = useState( isLogin )
    let [ autoLogin, setAutoLogin] = useState( auto_login )
    useEffect(function(){
        Auth.setLogin = setLogin
    },[])
    useEffect( function(){
        if(!login){
            // 如果能自动登录，调用登录接口登录
            if(autoLogin){
                !async function(){
                    loading('登录中...')
                    try {
                        await Taro.login()
                        loading.hide()
                    } catch (error) {
                        toast.error(error)
                    }
                }()
            }else{
                // 跳转到登录
                Taro.navigateTo({
                    url:'/login'
                })
            }
        } else {
            
        }
    })
}
