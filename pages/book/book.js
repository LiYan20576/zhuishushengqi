// pages/book/book.js
import Toast from "../../conmonpents/dist/toast/toast";
import { requestGet, bookURL,reviewURL } from "../../utils/require";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    review:[],
    star:null,
    wordCount:null,
    activeNames: ['1'],
    follower:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    console.log(bookURL,this.id)
    console.log(reviewURL,this.id)
    this.getBookData();
    this.getReviewData();
  },
  
  async getBookData() {
    const result1 = await requestGet(`${bookURL}${this.id}`);
    console.log(result1,'33333333333333333')
    this.author = result1.author
    this.cover = result1.cover
    this.title = result1.title
    for(var i=0,count=0,num =0;i<result1.starRatings.length;i++){
      count+=result1.starRatings[i].count
      num+=result1.starRatings[i].star*result1.starRatings[i].count
    }
    
    this.setData({
      book: result1,
      star:(num/count).toFixed(1),
      wordCount:(result1.wordCount/10000).toFixed(2),
      follower:(result1.totalFollower/10000).toFixed(0)
    });
    
  },
  async getReviewData() {
    const result2 = await requestGet(`${reviewURL}${this.id}`);
    for(var i=0 ; i<result2.reviews.length;i++){
      result2.reviews[i].updated=result2.reviews[i].updated.substring(0, 10)
    }
    
    this.setData({
      review: result2.reviews,
    });
  },
  onChange(event) {
    this.setData({
      activeNames: event.detail,
    });
  },
  onReady: function () { console.log(this.star)},
  buttonTapChange:function(){
    
  },
  onClickJoin() {
    var flag=true
    var app = getApp();
    // console.log(app.globalData.userInfo)
    var info = {"id":this.id,"cover":this.cover,"author":this.author,"title":this.title}
    for(var i=0;i<app.globalData.userInfo.length;i++){
      if(this.id==app.globalData.userInfo[i].id){
        Toast('已经在书架中');
        flag=false;
        break;
      }
    }
    if(flag==true){
      app.globalData.userInfo.push(info)
      Toast('加入书架成功');
    }
    
    // console.log(this.id,"2222222222222222222")
  },

  onClickBegin() {
    wx.navigateTo({
      url: '/pages/detail/detail',
      events: {
        // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据
        acceptDataFromOpenedPage: function(data) {
          console.log(data)
        },
        someEvent: function(data) {
          console.log(data)
        }
        
      },
      success: function(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', { data: 'test' })
      }
    })
  },
})