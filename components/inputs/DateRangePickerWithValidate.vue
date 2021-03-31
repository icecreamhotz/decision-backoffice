<template>
  <v-menu
    v-model="menu"
    :close-on-content-click="false"
    :nudge-right="40"
    transition="scale-transition"
    offset-y
    min-width="290px"
  >
    <template #activator="{ on }">
      <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
        <v-text-field
          :value="renderText"
          :error="errors.length > 0"
          :error-messages="errors.length > 0 ? errors[0] : ''"
          v-bind="$attrs"
          hide-details="auto"
          :placeholder="placeholder"
          append-icon="mdi-calendar-range"
          autocomplete="off"
          clearable
          @click:clear="$emit('input', [])"
          v-on="on"
        >
          <template #label>
            <div class="placeholder" :class="{'required': rules.includes('required')}">
              {{ label }}
            </div>
          </template>
        </v-text-field>
      </ValidationProvider>
    </template>
    <v-date-picker v-model="innerValue" range :locale="locale" @input="input" />
  </v-menu>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    locale: {
      type: String,
      default: 'th'
    },
    rules: {
      type: [Object, String],
      default: ''
    },
    value: {
      type: Array as () => string[],
      default: () => ([])
    },
    label: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  setup (props, {
    emit
  }) {
    const innerValue = ref<string[]>(props.value)
    const menu = ref<boolean>(false)
    const modal = ref<boolean>(false)
    const renderText = computed(() => {
      if (!innerValue.value[1] || (innerValue.value.length > 1 && (innerValue.value[0] === innerValue.value[1]))) {
        return formatDate(innerValue.value[0])
      }
      return [formatDate(innerValue.value[0]), formatDate(innerValue.value[1])].join(' - ')
    })

    watch(() => innerValue.value, (value) => {
      emit('input', value)
    })

    watch(() => props.value, (value) => {
      innerValue.value = value
    })

    const input = () => {
      if (innerValue.value.length === 2) {
        innerValue.value.sort()
        menu.value = false
        emit('input', innerValue.value)
      }
    }

    const formatDate = (date: string) => {
      if (!date) { return null }
      const [year, month, day] = date.split('-')
      return `${day}/${month}/${+year + 543}`
    }

    return {
      innerValue,
      menu,
      modal,
      renderText,
      input
    }
  }
})
</script>
