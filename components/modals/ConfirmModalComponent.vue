<template>
  <v-dialog
    :value="value"
    v-bind="$attrs"
    content-class="common-modal__dialog"
    width="450"
    @click:outside="$emit('input', false)"
  >
    <v-card>
      <div class="common-modal__container">
        <div class="common-modal__header">
          <div class="d-flex align-center">
            <span class="text-h4 text-black-color">{{ title }}</span>
            <v-spacer />
            <v-menu
              bottom
              left
            >
              <template #activator="{ on }">
                <v-btn
                  icon
                  v-on="on"
                  @click="$emit('input', false)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </template>
            </v-menu>
          </div>
        </div>
        <v-divider class="border-gainboro-color" />
        <div class="common-modal__content text-body-1 text-black-color">
          {{ text }}
        </div>
        <v-divider class="border-gainboro-color" />
        <div class="common-modal__footer">
          <CommonButton
            rounded
            depressed
            outlined
            :btn-text="cancelBtnText || $t('components.confirmModal.cancelBtnText')"
            @click="$emit('input', false)"
          />
          <SubmitButton
            :btn-text="successBtnText || $t('components.confirmModal.successBtnText')"
            @click="$emit('success')"
          />
        </div>
      </div>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    text: {
      type: String,
      default: ''
    },
    cancelBtnText: {
      type: String,
      default: ''
    },
    successBtnText: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="scss">
@media screen and (max-width: 380px) {
  .common-modal__container {
    .common-modal__footer {
      .common-btn {
        margin-right: 0px;
      }
      .submit-btn {
        margin-top: 16px;
      }
    }
  }
}
</style>
