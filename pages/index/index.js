// index.js
// 获取应用实例
const app = getApp()
import { requestGet,indexURL} from "../../utils/require";
Page({
  data: {
    imgUrls: [],
    indicatorDots: false,
    autoplay: true,
    interval: 5000,
    duration: 1000
  },
  onLoad() {
    this.getSwiperData();
  },
  async getSwiperData() {
    const result = await requestGet(indexURL);
    console.log(result.data.spread[0].advs)
    this.setData({
      imgUrls: result.data.spread[0].advs,
    });
  },
  
})
