import { request } from "../request";

export const setHeader = function(header:obj){
    return function(...args){
        let [params,method] = args
        return request(params,method,header)
    }
}