<template>
  <v-container fluid fill-height class="base-container-background align-start pa-0">
    <slot />
  </v-container>
</template>

<style scoped lang="scss">
.base-container-background {
  background-color: transparent;
  min-height: 100%;
}
</style>
