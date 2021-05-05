<template>
  <v-dialog
    :value="value"
    v-bind="$attrs"
    content-class="common-modal__dialog"
    width="450"
    @click:outside="$emit('input', false)"
  >
    <v-card>
      <ValidationObserver ref="observer" v-slot="{ invalid, validate }">
        <form @submit.prevent="submit(validate)">
          <div class="common-modal__container">
            <div class="common-modal__header">
              <div class="d-flex align-center">
                <span class="text-h3 text-black-color">{{ isEdit ? 'แก้ไขข้อมูลปฏิทิน' : 'เพิ่มข้อมูลปฏิทิน' }}</span>
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
            <div class="common-modal__content">
              <div>
                <InputWithValidate
                  v-model="name"
                  name="หัวข้อ"
                  label="หัวข้อ"
                  outlined
                  dense
                  flat
                  rules="required"
                />
              </div>
              <div
                class="spacing-16"
              >
                <TextareaWithValidate
                  v-model="description"
                  name="รายละเอียด"
                  label="รายละเอียด"
                  outlined
                  dense
                  flat
                  rules="required"
                />
              </div>
            </div>
            <v-divider class="border-gainboro-color" />
            <div class="common-modal__footer">
              <SubmitButton
                :disabled="invalid"
                btn-text="บันทึก"
              />
              <CommonButton
                v-if="isEdit"
                btn-text="ลบปฏิทิน"
                rounded
                depressed
                color="error"
                class="ml-3"
                @click="$emit('delete')"
              />
            </div>
          </div>
        </form>
      </ValidationObserver>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { defineComponent, ref, useContext, useRoute, watch } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    pId: {
      type: Number,
      default: 0
    },
    value: {
      type: Boolean,
      default: false
    },
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  setup (props, {
    root,
    emit
  }) {
    const name = ref<string>('')
    const description = ref<string>('')
    const context = useContext()
    const route = useRoute()
    const observer = ref<any>(null)

    watch(() => props.pId, (value) => {
      if (value) {
        fetchCategoryByID()
      }
    })

    watch(() => props.value, (value) => {
      if (!value) {
        name.value = ''
        description.value = ''
        root.$nextTick(() => observer.value?.reset())
      }
    })

    const fetchCategoryByID = async () => {
      try {
        const categoryRequest = await context.$axios.get(`/events/${props.pId}`)
        name.value = categoryRequest.data.data.title
        description.value = categoryRequest.data.data.description
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
      }
    }

    const submit = (validate: () => Promise<any>) => {
      validate().then((success: boolean) => {
        if (success) {
          emit('submit', name.value, description.value)
        }
      })
    }

    return {
      name,
      description,
      submit,
      observer
    }
  }
})
</script>
