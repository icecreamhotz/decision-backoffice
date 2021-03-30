<template>
  <span>
    <v-btn
      icon
      small
      :disabled="disabled"
      @click="dialog = true"
    >
      <v-icon class="default-font-size">
        mdi-delete-outline
      </v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      max-width="250"
      @click:outside="close"
    >
      <v-card class="text-center">
        <v-card-title class="d-block pt-5">
          <h4 class="text-primary">
            คุณต้องการจะลบหรือไม่ ?
          </h4>
        </v-card-title>

        <v-card-text>
          คุณกำลังจะยืนยันการลบข้อมูลรายการนี้ ถ้าหากต้องการลบข้อมูลกรุณากดปุ่มตกลง
        </v-card-text>

        <v-card-actions class="d-block pb-7">
          <div class="flex-grow-1" />
          <v-btn
            outlined
            color="primary"
            @click="close"
          >
            ยกเลิก
          </v-btn>

          <v-btn
            :loading="loading"
            :disabled="loading"
            color="primary"
            @click="deleteItem"
          >
            ตกลง
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>

export default {
  props: {
    deleteUrl: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      dialog: false,
      url: this.deleteUrl,
      loading: false
    }
  },
  watch: {
    deleteUrl (newValue) {
      this.url = newValue
    }
  },
  methods: {
    deleteItem () {
      const setStatus = true
      this.loading = setStatus
      this.$axios.delete(this.url)
        .then((res) => {
          this.$bus.$emit('message')
          this.$emit('complete', res.data)
        }).catch((err) => {
          this.$bus.$emit('message', err.message, 'error')
        }).finally(() => {
          this.loading = false
          this.dialog = false
        })
    },
    close () {
      this.dialog = false
    }
  }
}
</script>
