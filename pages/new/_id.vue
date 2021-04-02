<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="แก้ไขข้อมูลข่าวสาร">
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
              <v-col
                v-for="(image, index) in images"
                :key="index"
                cols="12"
                md="4"
                class="d-flex flex-column justify-space-between align-center"
              >
                <img :src="image.src" width="100%" height="auto">
                <v-btn
                  icon
                  class="text-gray-color mt-5"
                  x-small
                  @click="() => {
                    images.splice(index, 1)
                    deleteId = [...deleteId, image.id]
                  }"
                >
                  <v-icon>mdi-trash-can-outline</v-icon>
                </v-btn>
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
import { defineComponent, useContext, ref, useRouter, useRoute, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const router = useRouter()
    const route = useRoute()
    const name = ref<string>('')
    const description = ref<string>('')
    const files = ref<any>([])
    const images = ref<any>([])
    const deleteId = ref<any>([])
    const isSubmit = ref<boolean>(false)

    useFetch(async () => {
      try {
        const newData = await context.$axios.get(`/news/${route.value.params.id}`)
        const data = newData.data.data
        name.value = data.name
        description.value = data.description
        images.value = data.new_images.map((v: any) => ({
          id: v.id,
          src: v.url
        }))
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    })

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
            for (let i = 0; i < deleteId.value.length; i += 1) {
              formData.append('delete_id[]', deleteId.value[i])
            }
            await context.$axios.put(`/news/${route.value.params.id}`, formData)
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
      images,
      deleteId,
      isSubmit
    }
  }
})
</script>
