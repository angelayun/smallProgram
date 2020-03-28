Page({
    data:{
        title:'这是我做的第一个小程序的开发---这是另外一个页面了',
        todos:['吃饭','睡觉','学习'],
        val:""
    },
    handlerInput(e){
        this.setData({
            val:e.detail.value
        })
    },
    handlerTap(){
        /* wx.showToast({
            title: '点我干嘛呢',
        }) */
        this.setData({
            todos:this.data.todos.concat(this.data.val),
            val:''
        })
        // this.setData({
        //     title:'变化一下哈'
        // })
    }
})