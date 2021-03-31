<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-checkbox
      v-model="innerValue"
      v-bind="$attrs"
      :error="errors.length > 0"
      :error-messages="errors.length > 0 ? errorMessage || errors[0] : ''"
      hide-details="auto"
      :label="label"
      @change="$emit('input', $event)"
    >
      <template #label>
        <slot v-if="$slots.label" name="label" />
        <div v-else class="text-body-2 text-black-color">
          {{ label }}
        </div>
      </template>
    </v-checkbox>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    rules: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      required: true
    },
    errorMessage: {
      type: String,
      default: ''
    }
  },
  setup (props) {
    const innerValue = ref(props.value)

    watch(() => props.value, (value) => {
      innerValue.value = value
    })

    return {
      innerValue
    }
  }
})
</script>
