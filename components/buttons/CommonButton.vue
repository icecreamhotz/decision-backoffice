<template>
  <v-btn
    class="common-btn"
    v-bind="$attrs"
    @click="$emit('click')"
  >
    {{ btnText || $t('components.button.commonButton.defaultText') }}
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
