/**
 * Created by jsroads on 2019/11/2 . 12:30 下午
 * Note:
 */
import Browser from "./Browser";
import TalkBack from "./TalkBack";

const {ccclass, property} = cc._decorator;
@ccclass
export default class JSTalkHelper extends cc.Component {
    @property({
        type: cc.Label,
        displayName: "状态信息文本",
        tooltip: "展示操作过程的状态"
    })
    public descriptionLabel: cc.Label = null;

    protected onLoad(): void {
        TalkBack.init();
        this.descriptionLabel.string = "准备完毕，点击按钮开始通信"
    }

    public touchHandler(event: cc.Event.EventTouch, data: any): void {
        switch (data) {
            case "100":
                console.log("点击了 '无参无返' 按钮，开始调用");
                this.test100();
                break;
            case "200":
                console.log("点击了 '无参有返' 按钮，开始调用");
                this.test200();
                break;
            case "300":
                console.log("点击了 '有参有返' 按钮，开始调用");
                this.test300();
                break;
            case "400":
                console.log("点击了 '有参无返' 按钮，开始调用");
                this.test400();
                break;
            case "500":
                console.log("点击了 'OC 主动调用' 按钮，1秒后开始");
                this.test500();
                break;
            default:
        }
    }
    // 无参数，无返回值
    private test100() {
        let result: string = "";
        if (Browser.isIOS()) {
            jsb.reflection.callStaticMethod("AppController", "oneHundred");
        } else if (Browser.isAndroid()) {
            // TODO 安卓平台
        } else {
            console.log("平台不支持");
        }
    }
    // 无参数，有返回值
    private test200() {
        let result: string = "";
        if (Browser.isIOS()) {
            result = jsb.reflection.callStaticMethod("AppController", "twoHundred");
            console.log("返回值",result);
        } else if (Browser.isAndroid()) {
            // TODO 安卓平台
        } else {
            console.log("平台不支持");
        }
    }
    // 有参数，有返回值
    private test300() {
        let result: string = "",adId = "cocos10086",age = 18;
        if (Browser.isIOS()) {
            result = jsb.reflection.callStaticMethod("AppController", "threeHundred:withContent:",adId,age);
            console.log("返回值",result);
        } else if (Browser.isAndroid()) {
            // TODO 安卓平台
        } else {
            console.log("平台不支持");
        }
    }
    // 有参数，无返回值
    private test400() {
        let result: string = "",adId = "cocos10086",age = 18;
        if (Browser.isIOS()) {
            jsb.reflection.callStaticMethod("AppController", "fourHundred:withContent:",adId,age);
            console.log("无 返回值");
        } else if (Browser.isAndroid()) {
            // TODO 安卓平台
        } else {
            console.log("平台不支持");
        }
    }
    // 主动调用 timer 返回
    private test500() {
        let result: string = "",sec = 1;
        if (Browser.isIOS()) {
            result = jsb.reflection.callStaticMethod("AppController", "fiveHundred:",sec);
            console.log("返回值",result);
        } else if (Browser.isAndroid()) {
            // TODO 安卓平台
        } else {
            console.log("平台不支持");
        }
    }


}