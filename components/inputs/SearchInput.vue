<template>
  <v-text-field
    :value="value"
    append-icon="mdi-magnify"
    hide-details
    single-line
    @input="$emit('input', $event)"
    @keyup.enter="$emit('enter')"
  >
    <template #label>
      <div class="placeholder">
        {{ label }}
      </div>
    </template>
  </v-text-field>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    }
  }
})
</script>
