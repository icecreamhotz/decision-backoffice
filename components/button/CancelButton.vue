<template>
  <v-btn
    class="background-white"
    :disabled="stateLoading"
    :type="type"
    :block="block"
    :color="color"
    outlined
    @click="click"
  >
    {{ buttonText }}
  </v-btn>
</template>

<script>
export default {
  name: 'CancelButton',
  props: {
    type: {
      type: String,
      default: 'button'
    },
    loading: {
      type: Boolean,
      default: false
    },
    color: {
      type: String,
      default: 'primary'
    },
    buttonText: {
      type: String,
      default: 'ยกเลิก'
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
