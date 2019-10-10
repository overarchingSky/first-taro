namespace urlUtils {
  /**
   * 连接url
   * @param urls
   * @desc 自动处理衔接处的"/"
   */
  export function join(...urls: string[]): string {
    return urls
      .map(url => {
        return url.replace(/(^\/)|(\/$)/g, "");
      })
      .join("/");
  }

  /**
   * 获取url中的query参数
   * @param url
   */
  export function getParams(url: string): obj {
    let obj: obj = {};
    let paramsStr = url.replace(/[^\?]*\??([^#]*)(#.*)?/, "$1");
    paramsStr &&
      paramsStr.split("&").forEach((item: string) => {
        let splited = item.split("=");
        obj[splited[0]] = splited[1];
      });
    return obj;
  }

  /**
   * 是否是带有域名的全路径
   * @param url
   */
  export function isFullPath(url: string): boolean {
    return /https?:\/\//.test(url) || /^localhost/.test(url);
  }
}

export const Url = urlUtils;
