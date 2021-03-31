<template>
  <v-btn
    rounded
    depressed
    color="primary"
    class="submit-btn"
    v-bind="$attrs"
    type="submit"
    @click="$emit('click')"
  >
    {{ btnText || $t('components.button.submitButton.defaultText') }}
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
