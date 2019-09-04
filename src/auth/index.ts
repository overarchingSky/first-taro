import { Auth } from './Auth';

export const $auth = new Auth({
    //配置接口action
    fetch:{
        login:'',
        logout:'',
        user:''
    }
})