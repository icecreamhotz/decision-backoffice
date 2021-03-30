<template>
  <div class="card-content">
    <div v-if="title || $slots.action" class="header pb-0">
      <v-row class="d-flex align-center">
        <v-col sm="6" cols="12" :class="`${$vuetify.breakpoint.xs ? 'pb-2' : ''}`">
          <h3 class="dark--text">
            {{ title }}
          </h3>
        </v-col>
        <v-col v-if="$slots.action && !hiddenAction" sm="6" cols="12" :class="`text-right ${$vuetify.breakpoint.xs ? 'pb-2' : ''}`">
          <slot name="action" />
        </v-col>
      </v-row>
    </div>
    <div v-if="$slots.filter" class="filter">
      <slot name="filter" />
    </div>
    <div v-if="$slots.content" class="content pt-0">
      <slot name="content" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardContent',
  props: {
    title: {
      type: String,
      default: ''
    },
    hiddenAction: {
      type: Boolean,
      default: false
    }
  }
}
</script>
