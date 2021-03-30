<template>
  <v-btn
    :disabled="stateLoading"
    :loading="stateLoading"
    :type="type"
    :color="color"
    :block="block"
    @click="click"
  >
    บันทึก
  </v-btn>
</template>

<script>
export default {
  name: 'SaveButton',
  props: {
    type: {
      type: String,
      default: 'submit'
    },
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    block: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      stateLoading: this.loading
    }
  },
  watch: {
    loading (value) {
      this.stateLoading = this.loading
    }
  },
  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>
