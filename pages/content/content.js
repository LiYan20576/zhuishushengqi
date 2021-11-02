import { requestGet, bookContentURL } from "../../utils/require";

Page({
  data: {
content:[]
  },
  onLoad: function (options) {
    var _this = this;
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', function(data) {
      console.log(data.data,'asdasfas')
      _this.url=escape(data.data)
    })
      this.getContentData()
  },
  async getContentData() {
    // console.log(this.url,`${bookContentURL}${this.url}`)
    const result = await requestGet(`${bookContentURL}${this.url}`);
    console.log(escape(result.chapter.cpContent), '4444444')
    this.setData({
      content:result.chapter.cpContent,
    });
  },
  
})