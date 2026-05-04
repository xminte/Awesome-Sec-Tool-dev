Java.perform(function () {

    //  打印所有栈信息
    function showStacks() {
       console.log(
            Java.use("android.util.Log")
            .getStackTraceString(
                Java.use("java.lang.Throwable").$new()
            )
        );
    }

    var hashMap = Java.use("java.util.HashMap")
    hashMap.put.implementation = function(a,b){
        
        // 当key为username时,打印栈信息
        if(a.equals("username")){
            showStacks();
            console.log(a,b);
        }

        return this.put(a,b);
    }
});