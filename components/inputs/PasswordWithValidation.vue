<template>
  <ValidationProvider v-slot="{ errors }" :vid="$attrs.name" :name="$attrs.label" :rules="rules">
    <v-text-field
      v-model="innerValue"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :error-messages="errors"
      v-bind="$attrs"
      :type="showPassword ? 'text' : 'password'"
      :persistent-hint="hint ? true : false"
      :hint="hint"
      outlined
      @click:append="showPassword = !showPassword"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'PasswordWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null,
      required: true
    },
    hint: {
      type: String,
      default: ''
    }
  },
  data: () => ({
    innerValue: '',
    showPassword: false,
    errors: []
  }),
  watch: {
    // Handles internal model changes.
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    // Handles external model changes.
    value (newVal) {
      this.innerValue = newVal
    }
  },
  created () {
    if (this.value) {
      this.innerValue = this.value
    }
  }
}
</script>
