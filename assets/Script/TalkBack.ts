/**
 * Created by jsroads on 2019/9/24 . 4:14 下午
 * Note:
 */
export default class TalkBack {
    static init(){
        console.log("Back init")
    }
}
window.timerTestJSCallBck = (res)=>{
        console.log("JS 成功返回 输出",JSON.stringify(res));
}
declare global {
    interface Window {
        talkBack: TalkBack
        timerTestJSCallBck:any
    }
}