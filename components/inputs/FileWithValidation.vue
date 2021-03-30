<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-file-input
      v-model="innerValue"
      :accept="accept"
      :prepend-icon="prependIcon"
      :error-messages="errors[0] ? errors[0] : null"
      :type="$attrs.type"
      :multiple="multiple"
      v-bind="$attrs"
      outlined
      @input="onChange"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'FileWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    accept: {
      type: String,
      default: 'application/pdf'
    },
    prependIcon: {
      type: String,
      default: undefined
    },
    multiple: {
      type: Boolean,
      default: false
    },
    // must be included in props
    value: {
      type: null,
      required: true
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
    },
    innerValue (newVal) {
      this.$emit('input', newVal)
    }
  },
  methods: {
    onChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>
