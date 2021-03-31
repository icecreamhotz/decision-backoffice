<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-textarea
      :value="value"
      no-resize
      :placeholder="placeholder"
      :error="errors.length > 0"
      :error-messages="errors.length > 0 ? errors[0] : ''"
      v-bind="$attrs"
      hide-details="auto"
      @input="$emit('input', $event)"
    >
      <template #label>
        <div class="placeholder" :class="{'required': rules.includes('required')}">
          {{ label }}
        </div>
      </template>
    </v-textarea>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: null,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    rules: {
      type: String,
      default: ''
    }
  }
})
</script>
