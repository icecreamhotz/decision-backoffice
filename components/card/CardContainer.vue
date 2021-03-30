<template>
  <v-container fluid class="px-0 px-md-2 pt-md-2 pt-0">
    <v-row v-if="title || $slots.action">
      <v-col v-if="$slots.action" cols="6" class="pt-0">
        <h3>{{ title }}</h3>
      </v-col>
      <v-col v-else cols="12" class="pt-0">
        <h3>{{ title }}</h3>
      </v-col>
      <v-col v-if="$slots.action" cols="6" class="text-right pt-0">
        <slot name="action" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="pt-0">
        <slot name="content" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'CardContainer',
  props: {
    title: { type: String, default: '' }
  }
}
</script>
