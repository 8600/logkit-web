<template>
  <div class="text-input" :class="{error: isError}">
    <div class="left">
      <span v-if="required" class="required">*</span>
      <span class="label">{{label}}</span>
    </div>
    <div class="right">
      <input :value="value" @change="updateValue" :placeholder="placeholder" type="text"/>
      <div v-if="isError" class="err-box" title="此项目为必填选项">
        <svg t="1537493163822" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2623" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
          <path d="M480 64C217.6 64 0 281.6 0 544s217.6 480 480 480 480-217.6 480-480S742.4 64 480 64z m204.8 614.4c19.2 19.2 19.2 44.8 0 64-19.2 19.2-44.8 19.2-64 0L486.4 608 345.6 748.8c-19.2 19.2-51.2 19.2-70.4 0-19.2-19.2-19.2-51.2 0-70.4L416 537.6 281.6 403.2c-19.2-19.2-19.2-44.8 0-64 19.2-19.2 44.8-19.2 64 0L480 473.6l140.8-140.8c19.2-19.2 51.2-19.2 70.4 0 19.2 19.2 19.2 51.2 0 70.4L550.4 544l134.4 134.4z" fill="red" p-id="2624"></path>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    required: {
      default: false,
      type: Boolean
    },
    label: {
      default: '',
      type: String
    },
    placeholder: String
  },
  data () {
    return {
      isError: false
    }
  },
  created () {
    if (this.required) this.isError = true
  },
  methods: {
    updateValue (event) {
      const value = event.target.value
      console.log(value)
      // 判断是否输入值
      if (!value) {
        this.isError = true
      } else {
        this.isError = false
      }
      this.$emit('input', value)
    }
  }
}
</script>


<style scoped>
  .text-input {
    display: flex;
    justify-content: center;
  }
  .left {
    font-size: 12px;
    width: 200px;
    text-align: right;
    margin: 0 20px;
  }
  .text {
    color: #000;
  }
  .label {
    color: rgba(0, 0, 0, 0.43);
  }
  .right {
    width: 400px;
    margin: 0 20px;
    position: relative;
  }
  input {
    width: calc(100% - 10px);
    height: 28px;
    border: none;
    padding: 0 5px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }
  .err-box {
    display: none;
    position: absolute;
    top: 0;
    right: -40px;
    width: 20px;
    height: 20px;
    padding: 5px;
  }
  .error .err-box {
    display: block
  }
  .error input {
    border-color: red;
  }
</style>