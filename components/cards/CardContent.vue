<template>
  <div class="w-100 card-content">
    <v-row v-if="title || $slots.action" class="align-center my-0 mx-0">
      <v-col
        cols="12"
        :sm="longAction ? 2 : 6"
        :md="longAction ? 1 : 6"
        class="pa-0"
      >
        <div class="text-h2 text-black-color">
          {{ title }}
        </div>
        <div v-if="subTitle" class="text-body-1 text-gray-color spacing-8">
          {{ subTitle }}
        </div>
      </v-col>
      <v-col
        v-if="$slots.action"
        cols="12"
        :sm="longAction ? 10 : 6"
        :md="longAction ? 11 : 6"
        class="d-flex justify-end pa-0 pt-4 pt-md-0"
      >
        <slot name="action" />
      </v-col>
    </v-row>
    <v-row class="spacing-24 mb-0 mx-0">
      <v-col cols="12" class="pa-0">
        <div v-if="$slots.content">
          <slot name="content" />
        </div>
        <div v-if="$slots.submit" class="spacing-32">
          <slot name="submit" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    subTitle: {
      type: String,
      default: ''
    },
    longAction: {
      type: Boolean,
      default: false
    }
  }
})
</script>

<style scoped lang="scss">
.card-content {
  background: $white;
  border: 1px solid $white;
  box-sizing: border-box;
  border-radius: 10px;
  padding: 24px;
}
</style>
