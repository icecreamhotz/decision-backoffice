<template>
  <v-menu
    ref="menu"
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    :return-value.sync="innerValue"
    transition="scale-transition"
    offset-y
    max-width="290px"
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider v-slot="{ errors }" :name="$attrs.label" :rules="rules">
        <v-text-field
          v-model="innerValue"
          :error-messages="errors"
          :type="$attrs.type"
          v-bind="$attrs"
          outlined
          v-on="on"
        />
      </ValidationProvider>
    </template>
    <v-time-picker
      v-if="menu"
      v-model="innerValue"
      full-width
      @click:minute="$refs.menu.save(innerValue)"
    />
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'TimePickerWithValidation',
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
    }
  },
  data: () => ({
    innerValue: '',
    errors: [],
    menu: false,
    modal: false
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
