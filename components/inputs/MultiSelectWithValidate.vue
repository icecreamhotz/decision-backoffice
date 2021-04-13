<template>
  <ValidationProvider v-slot="{ errors }" :name="$attrs.name" :rules="rules">
    <div v-if="$attrs.title" class="placeholder" :class="{'required': rules.includes('required')}">
      {{ $attrs.title }}
    </div>
    <multiselect
      :close-on-select="closeOnSelect"
      :class="{'multi-select-error': errors.length > 0}"
      v-bind="$attrs"
      :show-labels="false"
      @input="$emit('input', $event)"
    >
      <template #noOptions>
        <label>ไม่พบข้อมูล</label>
      </template>
    </multiselect>
    <div
      v-if="errors.length > 0"
      class="alert-message-select v-messages theme--light error--text"
      role="alert"
    >
      <div class="v-messages__wrapper">
        <div class="v-messages__message">
          {{ errors[0] }}
        </div>
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
export default {
  props: {
    rules: {
      type: String,
      default: ''
    },
    isRequire: {
      type: Boolean,
      default: false
    },
    closeOnSelect: {
      type: Boolean,
      default: false
    }
  }
}
</script>
