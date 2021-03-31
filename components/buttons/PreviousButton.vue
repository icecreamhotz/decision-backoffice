<template>
  <v-btn
    v-bind="$attrs"
    rounded
    color="primary"
    class="previous-btn"
    depressed
    outlined
    @click="$emit('click')"
  >
    <v-icon color="primary">
      mdi-chevron-left
    </v-icon>
    <span class="mx-auto">{{ btnText || $t('components.button.previousButton.defaultText') }}</span>
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
.previous-btn {
  .v-btn__content {
    i {
      margin-top: 2px;
    }
  }
}
</style>
