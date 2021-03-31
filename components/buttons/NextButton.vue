<template>
  <v-btn
    v-bind="$attrs"
    rounded
    color="primary"
    class="next-btn"
    depressed
    @click="$emit('click')"
  >
    <span class="ml-auto">{{ btnText || $t('components.button.nextButton.defaultText') }}</span>
    <v-icon color="white" class="ml-auto">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    btnText: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: 'mdi-chevron-right'
    }
  }
})
</script>

<style scoped lang="scss">
.next-btn {
  .v-btn__content {
    i {
      margin-top: 2px;
    }
  }
}
</style>
