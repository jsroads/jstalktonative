window.__require = function e(t, o, n) {
function r(s, i) {
if (!o[s]) {
if (!t[s]) {
var l = s.split("/");
l = l[l.length - 1];
if (!t[l]) {
var u = "function" == typeof __require && __require;
if (!i && u) return u(l, !0);
if (c) return c(l, !0);
throw new Error("Cannot find module '" + s + "'");
}
}
var a = o[s] = {
exports: {}
};
t[s][0].call(a.exports, function(e) {
return r(t[s][1][e] || e);
}, a, a.exports, e, t, o, n);
}
return o[s].exports;
}
for (var c = "function" == typeof __require && __require, s = 0; s < n.length; s++) r(n[s]);
return r;
}({
Browser: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "2c644sWOu1FZ4ulnTM4+sqn", "Browser");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.now = function() {
return cc.sys.now();
};
Object.defineProperty(e, "onMiniGame", {
get: function() {
return cc.sys.browserType === cc.sys.BROWSER_TYPE_WECHAT_GAME;
},
enumerable: !0,
configurable: !0
});
e.isAndroid = function() {
return cc.sys.isNative && cc.sys.os === cc.sys.OS_ANDROID;
};
e.isIOS = function() {
return cc.sys.isNative && (cc.sys.os === cc.sys.OS_IOS || cc.sys.os === cc.sys.OS_OSX);
};
return e;
}();
o.default = n;
cc._RF.pop();
}, {} ],
JSTalkHelper: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "8e60f9zqG9DT6tsXg8/uAvb", "JSTalkHelper");
var n = this && this.__extends || function() {
var e = function(t, o) {
return (e = Object.setPrototypeOf || {
__proto__: []
} instanceof Array && function(e, t) {
e.__proto__ = t;
} || function(e, t) {
for (var o in t) t.hasOwnProperty(o) && (e[o] = t[o]);
})(t, o);
};
return function(t, o) {
e(t, o);
function n() {
this.constructor = t;
}
t.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n());
};
}(), r = this && this.__decorate || function(e, t, o, n) {
var r, c = arguments.length, s = c < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, o) : n;
if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, o, n); else for (var i = e.length - 1; i >= 0; i--) (r = e[i]) && (s = (c < 3 ? r(s) : c > 3 ? r(t, o, s) : r(t, o)) || s);
return c > 3 && s && Object.defineProperty(t, o, s), s;
};
Object.defineProperty(o, "__esModule", {
value: !0
});
var c = e("./Browser"), s = e("./TalkBack"), i = cc._decorator, l = i.ccclass, u = i.property, a = function(e) {
n(t, e);
function t() {
var t = null !== e && e.apply(this, arguments) || this;
t.descriptionLabel = null;
return t;
}
t.prototype.onLoad = function() {
s.default.init();
this.descriptionLabel.string = "准备完毕，点击按钮开始通信";
};
t.prototype.touchHandler = function(e, t) {
switch (t) {
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
}
};
t.prototype.test100 = function() {
c.default.isIOS() ? jsb.reflection.callStaticMethod("AppController", "oneHundred") : c.default.isAndroid() || console.log("平台不支持");
};
t.prototype.test200 = function() {
var e = "";
if (c.default.isIOS()) {
e = jsb.reflection.callStaticMethod("AppController", "twoHundred");
console.log("返回值", e);
} else c.default.isAndroid() || console.log("平台不支持");
};
t.prototype.test300 = function() {
var e = "";
if (c.default.isIOS()) {
e = jsb.reflection.callStaticMethod("AppController", "threeHundred:withContent:", "cocos10086", 18);
console.log("返回值", e);
} else c.default.isAndroid() || console.log("平台不支持");
};
t.prototype.test400 = function() {
if (c.default.isIOS()) {
jsb.reflection.callStaticMethod("AppController", "fourHundred:withContent:", "cocos10086", 18);
console.log("无 返回值");
} else c.default.isAndroid() || console.log("平台不支持");
};
t.prototype.test500 = function() {
var e = "";
if (c.default.isIOS()) {
e = jsb.reflection.callStaticMethod("AppController", "fiveHundred:", 1);
console.log("返回值", e);
} else c.default.isAndroid() || console.log("平台不支持");
};
r([ u({
type: cc.Label,
displayName: "状态信息文本",
tooltip: "展示操作过程的状态"
}) ], t.prototype, "descriptionLabel", void 0);
return t = r([ l ], t);
}(cc.Component);
o.default = a;
cc._RF.pop();
}, {
"./Browser": "Browser",
"./TalkBack": "TalkBack"
} ],
TalkBack: [ function(e, t, o) {
"use strict";
cc._RF.push(t, "a9ee8GMn+ZG8K1s5PkErihY", "TalkBack");
Object.defineProperty(o, "__esModule", {
value: !0
});
var n = function() {
function e() {}
e.init = function() {
console.log("Back init");
};
return e;
}();
o.default = n;
window.timerTestJSCallBck = function(e) {
console.log("JS 成功返回 输出", JSON.stringify(e));
};
cc._RF.pop();
}, {} ]
}, {}, [ "Browser", "JSTalkHelper", "TalkBack" ]);