<template>
  <div class="select-input">
    <div class="text-bar">
      <span v-if="must" class="must">*</span>
      <span>{{label}}:</span>
    </div>
    <div class="right">
      <select :value="value" @change="updateValue">
        <option v-for="item in option" :value="item.key" :key="item.key">{{item.value}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: null,
    option: Array,
    must: {
      default: false,
      type: Boolean
    },
    label: {
      default: '',
      type: String
    }
  },
  created () {
    if (this.value) this.$emit('input', this.value)
  },
  methods: {
    updateValue (event) {
      const value = event.target.value
      this.$emit('input', value)
    }
  }
}
</script>

<style scoped>
  .right {
    width: 400px;
  }
  select {
    width: 100%;
    height: 30px;
    color: #222;
    border-color: #ccc;
    border-radius: 3px;
    padding: 0 5px;
    background-color: whitesmoke;
  }
</style>