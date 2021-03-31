<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-select
      :value="value"
      :items="items"
      :item-text="textField"
      :item-value="valueField"
      :error-messages="errors"
      :placeholder="placeholder ? placeholder : label"
      hide-details="auto"
      v-bind="$attrs"
      @change="$emit('input', $event)"
    >
      <template #label>
        <div class="placeholder" :class="{'required': rules.includes('required')}">
          {{ label }}
        </div>
      </template>
    </v-select>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    rules: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      required: true
    },
    items: {
      type: Array,
      default () {
        return []
      }
    },
    textField: {
      type: String,
      default: ''
    },
    valueField: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    isRequire: {
      type: Boolean,
      default: false
    }
  }
})
</script>
