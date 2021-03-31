<template>
  <v-btn
    v-bind="$attrs"
    rounded
    color="primary"
    class="add-btn"
    depressed
    @click="$emit('click')"
  >
    <v-icon>
      mdi-plus-circle-outline
    </v-icon>
    <span>{{ btnText }}</span>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    btnText: {
      type: String,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
.add-btn {
  padding: 8px 12px !important;
  height: auto !important;
  min-width: inherit im !important;
  .v-btn__content {
    span {
      margin-left: 8px;
    }
  }
}
</style>
