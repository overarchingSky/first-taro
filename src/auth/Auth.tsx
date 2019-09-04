import Taro, { Component, useReducer, useRef } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

var ref

export async function withLoginComponent(Comp){
    let isLogin:boolean = (await storage.get('$_login')) === 'true'
    let [ login, setLogin] = useState( isLogin )
    // 利用useRef将setLogin方法引用暂时持久化（持续整个项目生命周期）
    ref = useRef (setLogin)
    useEffect(function(){
        if(!login){
            // 如果能自动登录，调用登录接口登录
            
        } else {
            // 跳转到登录
            Taro.navigateTo({
                url:'/login'
            })
        }
    })
    return (
        <Comp />
    )
}

export class Auth {
    constructor(options:obj){
        
    }
    /**
     * 登录
     * @param params 登录参数
     */
    login = async function(params){
        storage.set('$_login',true)
    }

    /**
     * 登出
     */
    logout = function (){
        //清除登录状态
        let setLogin = ref.current
        setLogin(false)
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
}