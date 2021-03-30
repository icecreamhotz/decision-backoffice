<template>
  <v-container
    class="home-page d-flex align-center"
  >
    <v-col cols="12" align="center" justify="center">
      <v-col cols="12" class="justify-center d-flex">
        <v-img src="/images/logo.png" max-width="265" max-height="265" />
      </v-col>
    </v-col>
  </v-container>
</template>

<script>

export default {
  components: {},
  data () {
    return {
    }
  },
  middleware: 'authorization',
  beforeMount () {}
}
</script>
