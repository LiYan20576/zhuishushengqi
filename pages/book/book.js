// pages/book/book.js
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
    // console.log(result1.starRatings)
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
    console.log(result2.reviews[0].author)
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
    
  }
})