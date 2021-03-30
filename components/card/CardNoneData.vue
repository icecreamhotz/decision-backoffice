<template>
  <div class="text-center no-content-part">
    <div class="d-block">
      <v-img src="/no-content-icon.png" width="100" class="mx-auto" />
      <div class="subtitle-2 pt-3">
        {{ text || 'ไม่พบข้อมูล' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: ''
    }
  }
}
</script>
