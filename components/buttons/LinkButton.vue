<template>
  <v-btn
    rounded
    depressed
    color="primary"
    class="link-btn"
    v-bind="$attrs"
    block
    :to="localePath({
      ...data,
      query: $router.query
    }, callback)"
  >
    {{ text || $t('components.button.linkButton.defaultText') }}
  </v-btn>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    },
    data: {
      type: Object,
      default () {
        return {
          name: 'choosen-service',
          params: {}
        }
      }
    },
    callback: {
      type: Function,
      default: () => {}
    }
  }
})
</script>
