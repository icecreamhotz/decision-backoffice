<template>
  <div>
    <CardContainer>
      <CardContent title="จัดการข้อมูลปัญหาที่พบบ่อย">
        <template slot="action">
          <AddButton
            btn-text="เพิ่มข้อมูลปัญหาที่พบบ่อย"
            :block="$vuetify.breakpoint.xsOnly"
            @click="$router.push('/problem/add')"
          />
        </template>
        <template slot="content">
          <v-row>
            <v-col cols="12">
              <DataTable
                :headers="headers"
                :data="data"
                :loading="loadingTable"
                :options.sync="options"
                :total="total"
                @edit="id => $router.push(`/problem/${id}`)"
                @delete="deleteDocumentProblem"
              />
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
    <ConfirmModalComponent
      v-model="deleteModalValue"
      title="ยืนยันการลบข้อมูลเอกสารในการใช้สำหรับแก้ไขปัญหา"
      text="คุณต้องการที่จะลบข้อมูลเอกสารในการใช้สำหรับแก้ไขปัญหาใช่หรือไม่"
      @success="onClickDeleteDocumentProblem"
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
        text: 'หัวข้อปัญหา', value: 'name', sortable: false, width: '200px', align: 'left'
      },
      {
        text: 'วิธีการแก้ปัญหา', value: 'description', sortable: false, width: '250px', align: 'left'
      },
      {
        text: 'จำนวนวิว', value: 'view', sortable: false, width: '50px', align: 'center'
      },
      {
        text: 'จัดการ', value: 'manager', sortable: false, width: '20px', align: 'left'
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
          fetchProblems()
        } else {
          isFirstLoad.value = false
        }
      }
    )

    const fetchProblems = async () => {
      try {
        const query = stringify({
          page: options.value.page,
          perPage: options.value.itemsPerPage
        })
        const problemRequest = await context.$axios.get(`/problems?${query}`)
        const problems = problemRequest.data.data
        data.value = problems.data.map((problem: any) => ({
          id: problem.id,
          name: problem.title,
          description: problem.description,
          view: problem.view
        }))
        total.value = problems.total
        page.value = problems.page
        loadingTable.value = false
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
        loadingTable.value = false
      }
    }

    const onClickDeleteDocumentProblem = async () => {
      try {
        await context.$axios.delete(`/document-problems/${deleteID.value}`)
        deleteModalValue.value = false
        deleteID.value = 0
        fetchProblems()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    }

    const deleteDocumentProblem = (id: number) => {
      deleteModalValue.value = true
      deleteID.value = id
    }

    fetchProblems()

    return {
      headers,
      loadingTable,
      total,
      options,
      page,
      data,
      deleteModalValue,
      deleteDocumentProblem,
      onClickDeleteDocumentProblem
    }
  }
})
</script>
