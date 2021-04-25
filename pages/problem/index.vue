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
                @status="updateIsHead"
                @edit="id => $router.push(`/problem/${id}`)"
                @delete="deleteProblem"
              />
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
    <ConfirmModalComponent
      v-model="deleteModalValue"
      title="ยืนยันการลบข้อมูลปัญหาที่พบบ่อย"
      text="คุณต้องการที่จะลบข้อมูลปัญหาที่พบบ่อยใช่หรือไม่"
      @success="onClickdeleteProblem"
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
        text: 'หมวดหมู่', value: 'category', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'จำนวนวิว', value: 'view', sortable: false, width: '50px', align: 'center'
      },
      {
        text: 'หัวข้อหลัก', value: 'active', sortable: false, width: '50px', align: 'left'
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
          active: problem.is_head,
          view: problem.view,
          category: problem.problem_category ? problem.problem_category.name : '-'
        }))
        total.value = problems.total
        page.value = problems.page
        loadingTable.value = false
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
        loadingTable.value = false
      }
    }

    const onClickdeleteProblem = async () => {
      try {
        await context.$axios.delete(`/problems/${deleteID.value}`)
        deleteModalValue.value = false
        deleteID.value = 0
        fetchProblems()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    }

    const deleteProblem = (id: number) => {
      deleteModalValue.value = true
      deleteID.value = id
    }

    const updateIsHead = async (value: any) => {
      try {
        await context.$axios.post(`/problems/${value.id}/__active_ishead`)
        fetchProblems()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
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
      updateIsHead,
      deleteProblem,
      onClickdeleteProblem
    }
  }
})
</script>
