<template>
  <div>
    <CardContainer>
      <CardContent title="จัดการข้อมูลปัญหาที่เข้ามาใหม่">
        <template slot="content">
          <v-row>
            <v-col cols="12">
              <DataTable
                :headers="headers"
                :data="data"
                :loading="loadingTable"
                :options.sync="options"
                :total="total"
                @edit="id => $router.push(`/problem-draft/${id}`)"
                @delete="deleteProblemDraft"
              />
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
    <ConfirmModalComponent
      v-model="deleteModalValue"
      title="ยืนยันการลบข้อมูลปัญหาที่เข้ามาใหม่"
      text="คุณต้องการที่จะลบข้อมูลปัญหาที่เข้ามาใหม่ใช่หรือไม่"
      @success="onClickdeleteProblemDraft"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, useContext } from '@nuxtjs/composition-api'
import stringify from 'qs-stringify'

export default defineComponent({
  setup () {
    const context = useContext()
    const headers = ref([
      {
        text: 'หัวข้อปัญหา', value: 'name', sortable: false, width: '400px', align: 'left'
      },
      {
        text: 'วันที่เพิ่มข้อมูล', value: 'created_at', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'จัดการ', value: 'delete', sortable: false, width: '20px', align: 'left'
      }
    ])
    const loadingTable = ref<boolean>(true)
    const total = ref<number>(1)
    const options = ref({ page: 1, itemsPerPage: 10 })
    const page = ref<number>(1)
    const data = ref([])
    const deleteModalValue = ref<boolean>(false)
    const isFirstLoad = ref<boolean>(true)
    const deleteID = ref<number>(0)

    watch(
      () => options.value,
      (optionValue) => {
        options.value.page = optionValue.page
        options.value.itemsPerPage = optionValue.itemsPerPage
        if (!isFirstLoad.value) {
          fetchProblemDrafts()
        } else {
          isFirstLoad.value = false
        }
      }
    )

    const fetchProblemDrafts = async () => {
      try {
        const query = stringify({
          page: options.value.page,
          perPage: options.value.itemsPerPage
        })
        const problemRequest = await context.$axios.get(`/problem-drafts?${query}`)
        const problems = problemRequest.data.data
        data.value = problems.data.map((problem: any) => ({
          id: problem.id,
          name: problem.title,
          created_at: context.app.$dayjs(problem.created_at).add(543, 'years').format('DD/MM/YYYY')
        }))
        total.value = problems.total
        page.value = problems.page
        loadingTable.value = false
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
        loadingTable.value = false
      }
    }

    const onClickdeleteProblemDraft = async () => {
      try {
        await context.$axios.delete(`/problem-drafts/${deleteID.value}`)
        deleteModalValue.value = false
        deleteID.value = 0
        fetchProblemDrafts()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    }

    const deleteProblemDraft = (id: number) => {
      deleteModalValue.value = true
      deleteID.value = id
    }

    fetchProblemDrafts()

    return {
      headers,
      loadingTable,
      total,
      options,
      page,
      data,
      deleteModalValue,
      deleteProblemDraft,
      onClickdeleteProblemDraft
    }
  }
})
</script>
