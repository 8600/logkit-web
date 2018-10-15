export default {
  install (Vue, options) {
    // get方法
    Vue.prototype.$alert = (option) => {
      const optionType = typeof option
      if (optionType === 'object' || optionType === 'string') {
        // 字符串处理
        if (optionType === 'string') {
          option = {
            text: option
          }
        }
        const title = option.title || '提示'
        const text = option.text || ''
        let alertElement = document.createElement('div')
        // 给全局添加确认事件回调
        let clickFun = `document.getElementById('alert').parentNode.removeChild(document.getElementById('alert'))`
        if (option.confirm) {
          window.$alertCallback = option.confirm
          clickFun = 'window.$alertCallback();' + clickFun
        }
        // 确认 取消按钮
        // if ()
        alertElement.innerHTML = `
          <div id="alert" class="alert-box" style="position: fixed; width: 100%; height: 100%;  z-index: 97; left: 0; top: 0;">
            <div class="blinker" style="position: absolute; width: 100%; height: 100%; z-index: 98; background-color: rgba(0, 0, 0, 0.50);" onclick="document.getElementById('alert').parentNode.removeChild(document.getElementById('alert'))"></div>
            <div class="alert" style="width: 300px; height: 220px; background-color: white; position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto; z-index: 99;">
              <div class="alert-title" style="border-bottom: 1px solid #eee; text-align: center;font-size: 15px;font-weight: 500;width: 100%;height: 49px;line-height: 50px;">${title}</div>
              <div class="alert-text" style="height: 100px; margin: 10px;">${text}</div>
              <div class="alert-button" style="background-color: #009fe9; color: white; text-align: center; height: 40px; line-height: 40px; margin: 10px;cursor: pointer;" onclick="${clickFun}">确定</div>
            </div>
          </div>
        `
        document.body.appendChild(alertElement)
      } else {
        console.error(`调用错误, 传入参数应该是一个对象而不是:${typeof option}`, option)
      }
    }
  }
}