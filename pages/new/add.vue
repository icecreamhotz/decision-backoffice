<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="เพิ่มข้อมูลข่าวสาร">
          <template slot="content">
            <v-row>
              <v-col cols="12">
                <InputWithValidate
                  v-model="name"
                  label="ข่าวสาร"
                  name="ข่าวสาร"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <TextareaWithValidate
                  v-model="description"
                  name="รายละเอียด"
                  label="รายละเอียด"
                  outlined
                  dense
                  flat
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <v-row v-for="(file, index) in files" :key="index">
                  <v-col :cols="index === 0 ? 12 : 11">
                    <FileInputWithValidate
                      v-model="file.value"
                      label="อัพโหลดไฟล์"
                      name="อัพโหลดไฟล์"
                      rules="required"
                      accept="image/*"
                    />
                  </v-col>
                  <v-col
                    v-if="index !== 0"
                    cols="1"
                  >
                    <v-btn
                      icon
                      class="text-gray-color"
                      x-small
                      @click="files.splice(index, 1)"
                    >
                      <v-icon>mdi-trash-can-outline</v-icon>
                    </v-btn>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
            <div
              class="spacing-16 text-link primary--text"
              @click="files = [...files, {value: null}]"
            >
              + รูปภาพ
            </div>
          </template>
          <template slot="submit">
            <SubmitButton
              :disabled="invalid || isSubmit"
              btn-text="บันทึก"
              class="d-flex mx-auto"
              :loading="isSubmit"
            />
          </template>
        </CardContent>
      </CardContainer>
    </form>
  </ValidationObserver>
</template>

<script lang="ts">
import { defineComponent, useContext, ref, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const router = useRouter()
    const name = ref<string>('')
    const description = ref<string>('')
    const files = ref<any>([{
      value: null
    }])
    const isSubmit = ref<boolean>(false)

    const submit = (validate: () => Promise<any>) => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            isSubmit.value = true
            const formData = new FormData()
            formData.append('name', name.value)
            formData.append('description', description.value)
            for (let i = 0; i < files.value.length; i += 1) {
              formData.append('files[]', files.value[i].value)
            }
            await context.$axios.post('/news', formData)
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
            isSubmit.value = true
            router.push('/new')
          } catch (err) {
            isSubmit.value = false
            context.store.commit('alert/show', { type: 'error', message: err })
          }
        }
      })
    }

    return {
      name,
      description,
      files,
      submit,
      isSubmit
    }
  }
})
</script>
