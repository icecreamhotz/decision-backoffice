<template>
  <v-btn
    :disabled="stateLoading || disable"
    :loading="stateLoading"
    color="primary"
    class="large-border"
    :block="block || $vuetify.breakpoint.xs"
    @click="click"
  >
    <v-icon v-if="icon" left>
      {{ iconName }}
    </v-icon>
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  name: 'AddButton',
  props: {
    disable: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: 'เพิ่ม'
    },
    loading: {
      type: Boolean,
      default: false
    },
    iconName: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: false
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
