<template>
  <VueTimepicker
    v-model="innerValue"
    :placeholder="placeholder"
    class="time-picker"
    close-on-complete
  />
</template>

<script>
import VueTimepicker from 'vue2-timepicker'
import 'vue2-timepicker/dist/VueTimepicker.css'

export default {
  name: 'TimePicker',
  components: {
    VueTimepicker
  },
  props: {
    value: {
      type: null,
      required: true
    },
    placeholder: {
      type: String,
      default: 'เวลา'
    }
  },
  data: () => ({
    innerValue: ''
  }),
  watch: {
    // Handles internal model changes.
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value
    }
  }
}
</script>

<style>
  .vue__time-picker {
    width: 100%;
  }
  .vue__time-picker input.display-time {
    padding: 27px 12px !important;
    font-family: Sarabun-Light;
    font-size: 16px !important;
    border-radius: 4px;
    border: 1px solid rgb(158, 158, 158) !important;
    width: 100%;
    outline-color: #44ADE3;
  }
  .dropdown {
    margin: 20px 0;
    font-size: 16px;
  }
  .vue__time-picker .clear-btn {
    right: 10px;
    color: #999 !important;
  }
  .vue__time-picker .dropdown, .vue__time-picker .dropdown .select-list {
    width: 100%;
  }
</style>
