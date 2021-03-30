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
          v-model="innerValue"
          :error-messages="errors"
          :type="$attrs.type"
          v-bind="$attrs"
          append-icon="mdi-calendar-blank"
          outlined
          class="date-input"
          v-on="on"
        />
      </ValidationProvider>
    </template>
    <v-date-picker v-model="innerValue" :allowed-dates="allowedDates" @input="menu = false" />
  </v-menu>
</template>

<script>
import { ValidationProvider } from 'vee-validate'
import moment from 'moment'

export default {
  name: 'DatePickerWithValidation',
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
    oppositeValue: {
      type: String,
      default () {
        return moment('YYYY-MM-DD')
      }
    },
    isEndDate: {
      type: Boolean,
      default: false
    },
    isCheckOpposite: {
      type: Boolean,
      default: false
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
  },
  methods: {
    allowedDates (val) {
      if (!this.isCheckOpposite) {
        return true
      }
      return this.isEndDate ? moment(val).isAfter(moment(this.oppositeValue), 'days') : moment(val).isSameOrBefore(moment(this.oppositeValue))
    }
  }
}
</script>
