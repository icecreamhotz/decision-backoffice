<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <v-radio-group
      v-model="innerValue"
      v-bind="$attrs"
      :error-messages="errors"
      hide-details="auto"
      @change="$emit('input', $event)"
    >
      <label v-if="label" :class="{'required-sign-before' : isRequire}" class="text-tiny">{{ label }}</label>
      <v-radio
        v-for="item in items"
        :key="`radio-${item.value}`"
        :label="item.text"
        :value="item.value"
      />
    </v-radio-group>
  </ValidationProvider>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from '@nuxtjs/composition-api'

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
      type: Array as () => string[],
      default: () => ([])
    },
    label: {
      type: String,
      default: ''
    },
    isRequire: {
      type: Boolean,
      default: false
    }
  },
  setup (props) {
    const innerValue = ref(props.value)

    watch(() => props.value, (value) => {
      innerValue.value = value
    })

    return {
      innerValue
    }
  }
})
</script>
