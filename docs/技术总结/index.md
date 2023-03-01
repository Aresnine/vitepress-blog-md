# 技术总结

## 1、微信环境下，网页不受微信字体影响
> 安卓:

```js
// 强制禁止用户修改微信客户端的字体大小
<script>
       (function() {
           if (typeof WeixinJSBridge == "object" && typeof WeixinJSBridge.invoke == "function") {
               handleFontSize();
           } else {
               if (document.addEventListener) {
                   document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
               } else if (document.attachEvent) {
                   document.attachEvent("WeixinJSBridgeReady", handleFontSize);
                   document.attachEvent("onWeixinJSBridgeReady", handleFontSize);  }
           }
           function handleFontSize() {
               // 设置网页字体为默认大小
               WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
               // 重写设置网页字体大小的事件
               WeixinJSBridge.on('menu:setfont', function() {
                   WeixinJSBridge.invoke('setFontSizeCallback', { 'fontSize' : 0 });
               });
           }
       })();
</script>
```

> 苹果：

```css
/* iOS禁止微信调整字体大小 */
body {
    -webkit-text-size-adjust: 100% !important;
    text-size-adjust: 100% !important;
    -moz-text-size-adjust: 100% !important;
}
```