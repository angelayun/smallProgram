
const db = wx.cloud.database();
Page({
    data: {
        title: '这是我做的第一个小程序的开发',
        todos: [],
        val: "",
        movies: []


    },
    onLoad: function () {
        // .where({
        //     done: false
        // })
        let self = this
        db.collection('todos').get({
            success: function (res) {
                // res.data 是包含以上定义的两条记录的数组
                // debugger
                console.log(res.data)
                self.setData({
                    todos: res.data
                })
            }
        })
    },
    handlerInput (e) {

        this.setData({
            val: e.detail.value
        })
    },
    handlerCloud () {
        let self = this
        wx.cloud.callFunction({
            // 需调用的云函数名
            name: 'top250',
            // 传给云函数的参数
            data: {
                a: 12,
                b: 19,
            },
            // 成功回调
            complete: res => { 
                console.log(res)
                self.setData({
                    movies: res.result.movies || []
                })
            }
        })
    },
    handlerTapDel (item) {
        console.log(item)
    },
    handlerTap () {
        /* wx.showToast({
            title: '点我干嘛呢',
        }) */
        let obj = {
            title: this.data.val,
            done: false
        }
        wx.showLoading({
            title: '新增中'
        })
        let self = this
        db.collection('todos').add({ data: obj, }).then(res => {
            wx.hideLoading()
            self.setData({
                todos: self.data.todos.concat(obj),
                val: ''
            })
        })
        /* this.setData({
            todos: this.data.todos.concat(this.data.val),
            val: ''
        }) */
        // this.setData({
        //     title:'变化一下哈'
        // })
    }
})