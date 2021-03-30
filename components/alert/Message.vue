<template>
  <v-snackbar
    v-model="show"
    :color="color"
    top
  >
    {{ text }}
  </v-snackbar>
</template>

<script>
export default {
  name: 'Message',
  data () {
    return {
      show: false,
      text: 'ทำรายการสำเร็จ',
      color: 'success'
    }
  },
  mounted () {
    this.$bus.$on('message', (text = 'ทำรายการสําเร็จ', color = 'success') => {
      this.text = text
      this.show = true
      this.color = color
      setTimeout(() => {
        this.show = false
      }, 3000)
    })
  },
  beforeDestroy () {
    this.$bus.$off('message')
  }
}
</script>
