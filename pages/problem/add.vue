<template>
  <ValidationObserver
    v-slot="{ validate, invalid }"
    class="w-100"
  >
    <form @submit.prevent="submit(validate)">
      <CardContainer>
        <CardContent title="เพิ่มข้อมูลปัญหาที่พบบ่อย">
          <template slot="content">
            <v-row>
              <v-col cols="12">
                <MultiSelectWithValidate
                  v-model="category"
                  :options="categoryLists"
                  searchable
                  name="หมวดหมู่"
                  placeholder="หมวดหมู่"
                  close-on-select
                  label="name"
                  track-by="id"
                />
              </v-col>
              <v-col cols="12">
                <InputWithValidate
                  v-model="name"
                  label="หัวข้อปัญหา"
                  name="หัวข้อปัญหา"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <TextareaWithValidate
                  v-model="detail"
                  name="รายละเอียด"
                  label="รายละเอียด"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <TextareaWithValidate
                  v-model="description"
                  name="วิธีีการแก้ปัญหา"
                  label="วิธีการแก้ปัญหา"
                  rules="required"
                />
              </v-col>
              <v-col cols="12">
                <FileInputWithValidate
                  v-model="file"
                  label="อัพโหลดไฟล์"
                  name="อัพโหลดไฟล์"
                />
              </v-col>
              <v-col cols="12" md="6">
                <label>ในกรณีที่ตอบใช่</label>
                <MultiSelectWithValidate
                  v-model="correct"
                  :options="questionLists"
                  searchable
                  name="คำถามถัดไปในกรณีตอบใช่"
                  placeholder="คำถามถัดไปในกรณีตอบใช่"
                  close-on-select
                  label="name"
                  track-by="id"
                />
              </v-col>
              <v-col cols="12" md="6">
                <label>ในกรณีที่ตอบไม่ใช่</label>
                <MultiSelectWithValidate
                  v-model="wrong"
                  :options="questionLists"
                  searchable
                  name="คำถามถัดไปในกรณีตอบไม่ใช่"
                  placeholder="คำถามถัดไปในกรณีตอบไม่ใช่"
                  close-on-select
                  label="name"
                  track-by="id"
                />
              </v-col>
            </v-row>
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
import { defineComponent, useContext, ref, useRouter, useFetch } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const router = useRouter()
    const name = ref<string>('')
    const detail = ref<string>('')
    const description = ref<string>('')
    const category = ref<any>([])
    const categoryLists = ref<any>([])
    const questionLists = ref<any>([])
    const correct = ref<any>(null)
    const wrong = ref<any>(null)
    const isSubmit = ref<boolean>(false)
    const file = ref<any>(null)

    useFetch(async () => {
      try {
        const [
          problems,
          categories
        ] = await Promise.all([
          context.$axios.get('/problems?perPage=999'),
          context.$axios.get('/problem-categories?perPage=999')
        ])
        questionLists.value = problems.data.data.data.map((v: any) => ({
          id: v.id,
          name: v.title
        }))
        categoryLists.value = categories.data.data.data.map((v: any) => ({
          id: v.id,
          name: v.name
        }))
      } catch (err) {
        isSubmit.value = false
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    })

    const submit = (validate: () => Promise<any>) => {
      validate().then(async (success: boolean) => {
        if (success) {
          try {
            isSubmit.value = true
            const formData = new FormData()
            formData.append('problem_category_id', category.value.id)
            formData.append('detail', detail.value)
            formData.append('title', name.value)
            formData.append('description', description.value)
            if (correct.value) {
              formData.append('child_true[]', correct.value.id as any)
            }
            if (wrong.value) {
              formData.append('child_false[]', wrong.value.id as any)
            }
            if (file.value) {
              formData.append('file', file.value)
            }
            await context.$axios.post('/problems', formData)
            context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ.' })
            isSubmit.value = true
            router.push('/problem')
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
      detail,
      category,
      file,
      categoryLists,
      questionLists,
      correct,
      wrong,
      submit,
      isSubmit
    }
  }
})
</script>
