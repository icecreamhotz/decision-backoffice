<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.label" :rules="rules">
    <!-- {{ errors }} -->
    <v-textarea
      v-model="innerValue"
      :error-messages="errors"
      :type="$attrs.type"
      v-bind="$attrs"
      :class="classinput"
      outlined
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'TextAreaWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    classinput: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: null,
      required: true
    }
  },
  data: () => ({
    innerValue: '',
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
