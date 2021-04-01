<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-file-input
      v-model="innerValue"
      :accept="accept"
      :error-messages="errors"
      prepend-icon="mdi-paperclip"
      v-bind="$attrs"
      outlined
      dense
      flat
      @change="$emit('input', $event)"
    />
  </ValidationProvider>
</template>

<script>
export default {
  name: 'FileInputWithValidation',
  props: {
    value: {
      type: null,
      required: true
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    accept: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      innerValue: this.value
    }
  },
  watch: {
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal
    }
  }
}
</script>
