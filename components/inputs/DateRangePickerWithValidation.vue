<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template v-slot:activator="{ on }">
      <ValidationProvider v-slot="{ errors }" :name="$attrs.label" :rules="rules">
        <v-text-field
          :value="renderText"
          :error-messages="errors"
          :type="$attrs.type"
          v-bind="$attrs"
          outlined
          class="date-input"
          v-on="on"
        />
      </ValidationProvider>
    </template>
    <v-date-picker v-model="innerValue" range :locale="locale" @input="input" />
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  name: 'DatePickerWithValidation',
  components: {
    ValidationProvider
  },
  props: {
    locale: {
      type: String,
      default: ''
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    // must be included in props
    value: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    innerValue: [],
    errors: [],
    menu: false,
    modal: false
  }),
  computed: {
    renderText () {
      if (this.innerValue.length > 1 && (this.innerValue[0] === this.innerValue[1])) {
        return this.innerValue[0]
      }
      return this.innerValue
    }
  },
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
  },
  methods: {
    input (e) {
      if (this.innerValue.length === 2) {
        this.innerValue.sort()
        this.menu = false
        this.$emit('input', this.innerValue)
      }
    }
  }
}
</script>
