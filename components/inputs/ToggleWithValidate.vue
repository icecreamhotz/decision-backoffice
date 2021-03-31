<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-switch
      v-model="innerValue"
      class="align-center toggle-container"
      :class="{'active-toggle': value}"
      v-bind="$attrs"
      :error="errors.length > 0"
      :error-messages="errors.length > 0 ? errors[0] : ''"
      hide-details="auto"
      @change="$emit('input', $event)"
    >
      <template v-if="label" #prepend>
        <span class="text-h5 text-gray-color">{{ label }}</span>
      </template>
    </v-switch>
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
      default: false
    },
    isDisabled: {
      type: Boolean,
      default: false
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

<style lang="scss">
.active-toggle {
  .v-input--switch__thumb {
    color: $white !important;
  }
  .v-input--switch__track {
    background-color: $primary !important;
    opacity: 1 !important;
  }
}
.toggle-container {
  .v-input__control {
    width: auto !important;
  }
}
</style>
