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
                <InputWithValidate
                  v-model="name"
                  label="หัวข้อปัญหา"
                  name="หัวข้อปัญหา"
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
    const description = ref<string>('')
    const questionLists = ref<any>([])
    const correct = ref<any>(null)
    const wrong = ref<any>(null)
    const isSubmit = ref<boolean>(false)

    useFetch(async () => {
      try {
        const problems = await context.$axios.get('/problems?perPage=999')
        questionLists.value = problems.data.data.data.map((v: any) => ({
          id: v.id,
          name: v.title
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
            await context.$axios.post('/problems', {
              title: name.value,
              description: description.value,
              child_true: correct.value ? [correct.value.id] : [],
              child_false: wrong.value ? [wrong.value.id] : []
            })
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
      questionLists,
      correct,
      wrong,
      submit,
      isSubmit
    }
  }
})
</script>
