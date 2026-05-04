/*
作用:这个Frida脚本的作用是hook Android应用程序中的java.util.Collections类的sort()方法。
脚本会针对两个重载版本的sort()方法进行hook。
当sort()方法被调用时，脚本首先打印调用栈信息，帮助了解sort()方法是在哪个位置被调用的。
接着，脚本会将传入的List参数转换为java.util.ArrayList类型，并打印排序前的List。
最后，脚本会继续调用原始的sort()方法，并返回结果。
*/

// 使用Java.perform函数确保在主线程中运行代码
Java.perform(function () {
    //使用Java.use获取对java.util.Collections类的引用
    var collections = Java.use("java.util.Collections");
    //定义一个显示调用栈信息的函数
    function showStacks() {
        console.log(
            Java.use("android.util.Log")
            .getStackTraceString(
                Java.use("java.lang.Throwable").$new()
            )
        );
    }

    // Hook java.util.Collections类的sort方法，该方法有一个参数(java.util.List)
    collections.sort.overload('java.util.List').implementation = function (a){// 显示调用栈信息
        showStacks();
        // 将传入的List参数转换为java.util.ArrayList类型
        var result = Java.cast(a, Java.use("java.util.ArrayList"));
        //打印排序前的List
        console.log("collections.sort List =", result.toString());
        // 继续调用原始的sort()方法
        return this.sort(a);
    }

    // Hook java.util.Collections类的sort方法，该方法有两个参数(java.util.List, java.util.Comparator)
    collections.sort.overload('java.util.List', 'java.util.Comparator').implementation = function (a, b) {
        //显示调用栈信息
        showStacks();
        // 将传入的List参数转换为java.util.ArrayList类型
        var result = Java.cast(a, Java.use("java.util.ArrayList"));

        //打印排序前的List
        console.log("collections.sort List Comparator =", result.toString());
        // 继续调用原始的sort()方法
        return this.sort(a, b); 
    }
});