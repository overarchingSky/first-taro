import Taro, { Component, useReducer } from '@tarojs/taro';
import { useEffect, useState } from 'react';
import { storage } from '../utils/storage';

export async function withLoginComponent(Comp){
    let [ login, setLogin] = useState( await storage.get('$_login') )
    useEffect(function(){
        if(!login){
            // 如果能自动登录，调用登录接口登录
            
        } else {
            // 跳转到登录
        }
    })
    return (
        <Comp />
    )
}