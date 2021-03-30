<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <!-- Usage Example -->
    <!-- <InputWithValidation
      v-model="textsearch"
      :rules="'required|min:2|max:20'"
      class="required"
      label="123"
      placeholder="456"
    /> -->
    <v-text-field
      v-model="innerValue"
      :append-icon="appendIcon"
      :prepend-icon="prependIcon"
      :error-messages="errors[0] ? errors[0] : null"
      :type="$attrs.type"
      v-bind="$attrs"
      :maxlength="maxLength"
      :outlined="outlined"
      :hide-details="hideDetails"
      @input="onChange"
      v-on="$listeners"
    />
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'InputWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    prependIcon: {
      type: String,
      default: undefined
    },
    appendIcon: {
      type: String,
      default: undefined
    },
    outlined: {
      type: Boolean,
      default: true
    },
    // must be included in props
    value: {
      type: null,
      required: true
    },
    maxLength: {
      type: String,
      default: ''
    },
    hideDetails: {
      type: Boolean,
      default: false
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
  },
  methods: {
    onChange (value) {
      this.$emit('input', value)
    }
  }
}
</script>
