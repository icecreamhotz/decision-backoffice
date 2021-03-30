<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-switch
      v-model="innerValue"
      inset
      style="width: max-content;"
      v-bind="$attrs"
      :disabled="isDisabled"
      :error-messages="errors"
      :label="labelPosition === 'right' ? label : null"
      :class="{'required-sign-before' : isRequire, ...switchClass, 'inactive-toggle' : innerValue == false && !isDisabled, 'disabled-toggle' : isDisabled }"
      @change="$emit('change', $event)"
    >
      <template v-if="labelPosition === 'left'" #prepend>
        <div class="toggle-label-wrapper">
          <label :class="{'required-sign-before' : isRequire}" :for="$attrs.name">
            <span :class="{'text-dark-grey' : !innerValue, 'text-dark': innerValue}">{{ label }}</span>
            <v-tooltip v-if="helpText" bottom>
              <template v-slot:activator="{ on }">
                <v-icon color="primary" style="cursor: pointer" v-on="on">mdi-help-circle-outline</v-icon>
              </template>
              <span>{{ helpText }}</span>
            </v-tooltip>
          </label>
        </div>
      </template>
    </v-switch>
  </ValidationProvider>
</template>

<script>
import { ValidationProvider } from 'vee-validate'

export default {
  components: {
    ValidationProvider
  },
  props: {
    switchClass: {
      type: Object,
      default: () => ({})
    },
    rules: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    labelPosition: {
      type: String,
      default: 'right'
    },
    value: {
      type: null,
      default: false
    },
    isRequire: {
      type: Boolean,
      default: false
    },
    helpText: {
      type: String,
      default: ''
    },
    isFullArea: {
      type: Boolean,
      default: false
    },
    isDisabled: {
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
    value (newVal) {
      this.innerValue = newVal
    }
  }

}
</script>
