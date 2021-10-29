// https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753 
export function requestGet(url, data) {
    return new Promise((reslove, reject) => {
      wx.request({
        //请求地址
        url: url,
        //请求方式
        method: "get",
        //请求参数
        data: data,
        //设置请求头  如果发送的是post请求，一定要添加请求的content-type
        header: {
          "content-type": "application/json",
        },
        //请求返回结果的数据类型
        dataType: "json",
        //请求回调
        success: ({ statusCode, data }) => {
          if (statusCode === 200) {
            reslove(data);
          } else {
            reject("服务器响应出错");
          }
        },
        // 请求失败执行的回调函数
        fail: function (err) {
          reject(err)
        },
        // 接口调用结束的回调函数（调用成功、失败都会执行）
        complete: function (res) {},
      });
    });
  }
  
  
  export var indexURL = "https://b.zhuishushenqi.com/category/classifylist?node=bf0a65255a5b4c138052dca8ef065753" //首页
  export var bookURL="http://api.zhuishushenqi.com/book/"                                                        //书籍详情  ?_id
  export var reviewURL="http://api.zhuishushenqi.com/post/review/by-book?book="           //评论