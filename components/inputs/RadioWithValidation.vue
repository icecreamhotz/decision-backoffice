<template>
  <ValidationProvider v-slot="{ errors }" :name="name" :rules="rules">
    <v-radio-group v-model="innerValue" :name="name" :error-messages="errors" :row="row">
      <template v-for="(item, i) in items">
        <v-radio :key="i" :label="item.label" :value="item.value" />
      </template>
    </v-radio-group>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'RadioWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    rules: {
      type: [Object, String],
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: ''
    },
    options: {
      type: Array,
      default: () => []
    },
    row: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      innerValue: this.value,
      items: this.options
    }
  },
  watch: {
    options (val) {
      this.items = val
    },
    innerValue (newVal) {
      this.$emit('input', newVal)
    },
    value (newVal) {
      this.innerValue = newVal
    }
  }
}
</script>
