<template>
  <div>
    <CardContainer>
      <CardContent title="จัดการหมวดหมู่ปัญหาที่พบบ่อย">
        <template slot="action">
          <AddButton
            btn-text="เพิ่มข้อมูลหมวดหมู่ปัญหาที่พบบ่อย"
            :block="$vuetify.breakpoint.xsOnly"
            @click="$router.push('/problem-category/add')"
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
                @edit="id => $router.push(`/problem-category/${id}`)"
                @delete="deleteProblemCategory"
              />
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
    <ConfirmModalComponent
      v-model="deleteModalValue"
      title="ยืนยันการลบข้อมูลหมวดหมู่ปัญหาที่พบบ่อย"
      text="คุณต้องการที่จะลบข้อมูลหมวดหมู่ปัญหาที่พบบ่อยใช่หรือไม่"
      @success="onClickProblemCategory"
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
        text: 'ชื่อ', value: 'name', sortable: false, width: '400px', align: 'left'
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
          fetchProblemCategories()
        } else {
          isFirstLoad.value = false
        }
      }
    )

    const fetchProblemCategories = async () => {
      try {
        const query = stringify({
          page: options.value.page,
          perPage: options.value.itemsPerPage
        })
        const problemCategoryRequest = await context.$axios.get(`/problem-categories?${query}`)
        const problemCategories = problemCategoryRequest.data.data
        data.value = problemCategories.data.map((document: any) => ({
          id: document.id,
          name: document.name
        }))
        total.value = problemCategories.total
        page.value = problemCategories.page
        loadingTable.value = false
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
        loadingTable.value = false
      }
    }

    const onClickProblemCategory = async () => {
      try {
        await context.$axios.delete(`/problem-categories/${deleteID.value}`)
        deleteModalValue.value = false
        deleteID.value = 0
        fetchProblemCategories()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        if (err.response!.status === 400) {
          context.store.commit('alert/show', { type: 'error', message: 'ไม่สามารถลบข้อมูลได้ เนื่องจากมีข้อมูลปํญหาที่พบบ่อยใช้หมวดหมู่นี้อยู่.' })
        } else {
          context.store.commit('alert/show', { type: 'error', message: err })
        }
      }
    }

    const deleteProblemCategory = (id: number) => {
      deleteModalValue.value = true
      deleteID.value = id
    }

    fetchProblemCategories()

    return {
      headers,
      loadingTable,
      total,
      options,
      page,
      data,
      deleteModalValue,
      deleteProblemCategory,
      onClickProblemCategory
    }
  }
})
</script>
