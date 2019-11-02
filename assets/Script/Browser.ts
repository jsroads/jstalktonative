/**
 * Created by jsroads on 2019/11/2 . 12:32 下午
 * Note:
 */
export default class Browser {
    /**
     * 系统时间
     */
    static now() {
        return cc.sys.now();
    }

    /**
     * 是否是小游戏平台
     */
    static get onMiniGame() {
        return cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME;
    }

    static isAndroid(){
        return cc.sys.isNative&&cc.sys.os === cc.sys.OS_ANDROID;
    }

    static isIOS(){
        return cc.sys.isNative&&(cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX);
    }
}