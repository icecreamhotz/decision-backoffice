<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-checkbox
      v-model="innerValue"
      :error-messages="errors"
      v-bind="$attrs"
      class="mt-0"
      v-on="$listeners"
      @change="onChange"
    />
  </ValidationProvider>
</template>
<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  props: {
    value: {
      type: [String, Boolean],
      default: null
    },
    rules: {
      type: String,
      default: 'required'
    }
  },
  data () {
    return {
      innerValue: this.value
    }
  },
  watch: {
    value (newValue) {
      this.innerValue = newValue
    }
  },
  methods: {
    onChange (value) {
      this.$emit('updated', value)
    }
  }
}
</script>
