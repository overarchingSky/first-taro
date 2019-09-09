import Taro from '@tarojs/taro';
import { fetch } from './fetch';
/**
 * 创建API Action
 *
 * @export
 * @param actionType Action类型
 * @param [func] 请求API方法，返回Promise
 * @returns 请求之前dispatch { type: ${actionType}_request }
 *          请求成功dispatch { type: ${actionType}, payload: ${resolveData} }
 *          请求失败dispatch { type: ${actionType}_failure, payload: ${rejectData} }
 */
export function createApiAction(actionType, func = fetch) {
  return (
    params = {},
    customActionType = actionType,
  ) => async (dispatch) => {
    try {
      dispatch({ type: `${customActionType  }_request`, params });
      const data = await func(params);
      dispatch({ type: customActionType, params, payload: data });
      return data
    } catch (e) {
      // 显示错误页面
      dispatch({ type: `${customActionType  }_failure`, params, payload: e })
      return Promise.reject(e)
    }
  }
}

export function setToken (token:string):void{
  Taro.setStorage({key:'token',data:token})
}
  //使用方式
  //export const list = createApiAction(LIST, params => api.get('news/list', params))
  //页面：
  //list(params)


