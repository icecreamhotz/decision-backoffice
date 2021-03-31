<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <div :class="{'d-flex': preText}">
      <div v-if="preText" class="input-pre-text align-center d-flex px-3 text-h5">
        {{ preText }}
      </div>
      <v-text-field
        :value="value"
        :error="errors.length > 0"
        :error-messages="errors.length > 0 && !hideError ? errors[0] : ''"
        v-bind="$attrs"
        outlined
        dense
        flat
        :prepend-inner-icon="icon"
        :class="{'input-with-pre-text': preText, 'input-with-btn-inner-right': innerButton}"
        hide-details="auto"
        v-on="$listeners"
        @input="$emit('input', $event)"
      >
        <template #label>
          <div class="placeholder" :class="{'required': rules.includes('required')}">
            {{ label }}
          </div>
        </template>
        <template v-if="inner || innerButton" #append>
          <div
            v-if="inner"
            class="primary--text text-no-wrap cursor-pointer"
            @click="$emit('innerClick', value)"
          >
            {{ innerText }}
          </div>
          <v-btn
            v-if="innerButton"
            color="primary"
            class="btn-inner-right"
            depressed
            :disabled="innerButtonDisabled"
            @click="$emit('innerButtonClick', value)"
          >
            {{ innerText }}
          </v-btn>
        </template>
      </v-text-field>
    </div>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'InputWithValidate',
  props: {
    rules: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    icon: {
      type: String,
      default: ''
    },
    preText: {
      type: String,
      default: ''
    },
    hideError: {
      type: Boolean,
      default: false
    },
    inner: {
      type: Boolean,
      default: false
    },
    innerText: {
      type: String,
      default: ''
    },
    innerButton: {
      type: Boolean,
      default: false
    },
    innerButtonDisabled: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style lang="scss">
.input-pre-text {
  z-index: 2;
  height: 40px;
  border: 1px solid $dark-gray;
  border-right: 0;
  border-radius: 5px 0 0 5px !important;
  background-color: $gains-boro;
  color: $dark-gray;
  padding-top: 2px;
}
.input-with-pre-text {
  border-radius: 0 5px 5px 0 !important;
  fieldset {
    border-color: rgba(0, 0, 0, 0.42);
  }
}
.v-input__append-inner {
  align-self: center !important;
  margin-top: 0 !important;
}
.input-with-btn-inner-right {
  .v-input__control {
    .v-input__slot {
      padding-right: 0px !important;
    }
  }
}
.btn-inner-right {
  font-size: 14px !important;
  height: 40px !important;
  min-width: 68px !important;
  border-top-left-radius: 0px;
  border-bottom-left-radius: 0px;
  padding: 0 8px !important;
}
</style>
