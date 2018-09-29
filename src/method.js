export default {
  install (Vue, options) {
    // get方法
    Vue.prototype.$alert = (title = "提示", text = "") => {
      document.write(`
      <div id="alert" class="alert-box" style="position: fixed; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.50); z-index: 999; left: 0; top: 0;">
        <div class="alert" style="width: 300px; height: 220px; background-color: white; position: absolute; left: 0; top: 0; right: 0; bottom: 0; margin: auto;">
          <div class="alert-title" style="border-bottom: 1px solid #eee; text-align: center;font-size: 15px;font-weight: 500;width: 100%;height: 49px;line-height: 50px;">${title}</div>
          <div class="alert-text" style="height: 100px; margin: 10px;">${text}</div>
          <div class="alert-button" style="background-color: #009fe9; color: white; text-align: center; height: 40px; line-height: 40px; margin: 10px;cursor: pointer;" onclick="document.getElementById('alert').parentNode.removeChild(document.getElementById('alert'))">确定</div>
        </div>
      </div>
      `)
    }
  }
}