import Taro from '@tarojs/taro';

/**
 * 
 * 从本地缓存中异步获取指定 key 对应的内容。
 * @param key 
 */
function getStorage(key) {
    return Taro.getStorage({ key }).then(res => res.data)
}

/**
 * 将数据存储在本地缓存中指定的 key 中，会覆盖掉原来该 key 对应的内容，这是一个异步接口。
 * @param key 
 * @param value 
 */
function setStorage(key,value){
    Taro.setStorage({ key, data: value })
}

export const storage = {
    get:getStorage,
    set:setStorage
}