Java.perform(function () {
        // 获取类
        var jsonRequest = Java.use("com.dodonew.online.http.JsonRequest");
        // console.log("jsonRequest =", jsonRequest);

        // 重写方法,这里重写了paraMap方法, 打印参数a, 然后调用原始方法;
        // 这里写参数a，是因为paraMap方法只有一个参数
        // jsonRequest.paraMap.implementation = function (a) {
        //     console.log("jsonRequest.paraMap a =", a);
        //     // 调用原始方法
        //     this.paraMap(a);
        // }

        // 当遇到多个同名方法时,需要指定参数类型，需要写上overload
        jsonRequest.addRequestMap.overload('java.util.Map', 'int').implementation = function (a, b) {
            // console.log("addRequestMap a =", a, " b =", b);

            // 获取参数a中的username字段
            // console.log("username =", a.get("username"));
            
            // 将参数a转换为HashMap类型，方便打印
            var c = Java.cast(a, Java.use("java.util.HashMap"));
            console.log("addRequestMap param1 :", c.toString());

            console.log("addRequestMap param2 :", b);

            // 调用原始方法
            this.addRequestMap(a, b);
        }

        var utils = Java.use("com.dodonew.online.util.Utils");

        utils.md5.implementation = function (d) {
            console.log("before md5: ", d);
            console.log("after md5: ", this.md5(d));
            
            // 调用原始方法
            return this.md5(d);
        }

        var requestUtil = Java.use("com.dodonew.online.http.RequestUtil");

        requestUtil.encodeDesMap.overload('java.lang.String', 'java.lang.String', 'java.lang.String').implementation = function(a,b,c){
             console.log("requestUtil a: ", a);
             console.log("requestUtil b: ", b);
             console.log("requestUtil c: ", c);

             return this.encodeDesMap(a,b,c);
        }

        var dESKeySpec = Java.use("javax.crypto.spec.DESKeySpec");
        var base64 = Java.use("android.util.Base64");

        // 对初始化方法进行重写
        dESKeySpec.$init.overload('[B').implementation = function(a){
            console.log("dESKeySpec",base64.encodeToString(a, 0));

            this.$init(a);

        }
});