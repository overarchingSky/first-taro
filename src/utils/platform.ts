export enum platforms {
    '微信小程序' = 'weapp',
    '百度小程序' = 'swan',
    '支付宝小程序' = 'alipay',
    'h5' = 'h5',
    'rn' = 'rn',
    '字节跳动小程序' = 'tt',
    //'qq小程序' = 'qq',
    //'快应用' = 'quickapp'
}

export const platform = {
    '微信小程序':platforms.微信小程序 === process.env.TARO_ENV,
    '百度小程序':platforms.百度小程序 === process.env.TARO_ENV,
    '支付宝小程序':platforms.支付宝小程序 === process.env.TARO_ENV,
    'h5':platforms.h5 === process.env.TARO_ENV,
    'rn':platforms.rn === process.env.TARO_ENV,
    '字节跳动小程序':platforms.字节跳动小程序 === process.env.TARO_ENV,
    //'qq小程序':platforms.qq小程序 === process.env.TARO_ENV,
    //'快应用':platforms.快应用 === process.env.TARO_ENV
}

// useage
// if(platform.支付宝小程序){
//     ...
// }