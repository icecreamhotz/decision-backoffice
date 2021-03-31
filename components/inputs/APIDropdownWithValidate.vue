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
import { defineComponent, ref, useContext, watch } from '@nuxtjs/composition-api'

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
    placeholder: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      required: true
    },
    textField: {
      type: String,
      required: true
    },
    valueField: {
      type: String,
      required: true
    },
    label: {
      type: String,
      default: ''
    },
    isRequire: {
      type: Boolean,
      default: false
    },
    isAddFirstOption: {
      type: Boolean,
      default: false
    },
    firstOption: {
      type: Object,
      default: null
    }
  },
  setup (props, {
    emit
  }) {
    const context = useContext()
    const items = ref<any>([])

    watch(() => props.value, (value) => {
      let item = {}
      if (items.value.length > 0 && value) {
        const obj = items.value.find((el:any) => el[props.valueField] === value)
        if (obj) {
          item = Object.assign({}, obj)
        }
      }
      emit('change', item)
    })

    watch(() => props.url, () => {
      fetchAPI()
    })

    const fetchAPI = () => {
      if (props.url) {
        context.$axios.get(props.url)
          .then((res) => {
            const { data } : { data: any } = res.data
            items.value = [...data]
            if (props.isAddFirstOption) {
              items.value.unshift(props.firstOption)
            }
          })
      } else {
        items.value = []
      }
    }

    fetchAPI()

    return {
      items
    }
  }
})
</script>
