// pages/book/book.js
import { requestGet, bookURL,reviewURL } from "../../utils/require";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    book: [],
    review:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.id = options.id;
    console.log(bookURL,this.id)
    this.getBookData();
    this.getReviewData();
  },
  onReady: function () { },
  async getBookData() {
    const result1 = await requestGet(`${bookURL}${this.id}`);
    // console.log(result1)
    this.setData({
      book: result1,
    });
  },
  async getReviewData() {
    const result2 = await requestGet(`${reviewURL}${this.id}`);
    // console.log(result2)
    this.setData({
      review: result2,
    });
  },
})