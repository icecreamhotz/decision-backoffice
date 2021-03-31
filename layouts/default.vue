<template>
  <v-app>
    <Snackbar />
    <Navbar />
    <PageLoading />
    <v-main class="main-container">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  middleware: 'authorization'
})
</script>

<style lang="scss">
.main-container {
  .v-main__wrap {
    padding: 32px;
  }
}
</style>
