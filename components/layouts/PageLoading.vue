<template>
  <div id="page-loading" class="page-loading">
    <v-icon color="white">
      mdi-loading mdi-spin
    </v-icon> Loading . . .
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  name: 'PageLoading'
})
</script>

<style lang="scss" scoped>
.page-loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  font-size: 24px;
  font-weight: bold;
  color: white;
  z-index: 9999;
  background-color: black;
  opacity: 0.7;
  display: none;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}
</style>
