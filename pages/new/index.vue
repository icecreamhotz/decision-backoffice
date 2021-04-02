<template>
  <div>
    <CardContainer>
      <CardContent title="จัดการข้อมูลข่าวสาร">
        <template slot="action">
          <AddButton
            btn-text="เพิ่มข้อมูลข้อมูลข่าวสาร"
            :block="$vuetify.breakpoint.xsOnly"
            @click="$router.push('/new/add')"
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
                @edit="id => $router.push(`/new/${id}`)"
                @delete="deleteNew"
              />
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
    <ConfirmModalComponent
      v-model="deleteModalValue"
      title="ยืนยันการลบข้อมูลข่าวสาร"
      text="คุณต้องการที่จะลบข้อมูลข่าวสารใช่หรือไม่"
      @success="onClickDeleteNew"
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
        text: 'ชื่อ', value: 'name', sortable: false, width: '200px', align: 'left'
      },
      {
        text: 'รายละเอียด', value: 'description', sortable: false, width: '200px', align: 'left'
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
          fetchNews()
        } else {
          isFirstLoad.value = false
        }
      }
    )

    const fetchNews = async () => {
      try {
        const query = stringify({
          page: options.value.page,
          perPage: options.value.itemsPerPage
        })
        const newRequest = await context.$axios.get(`/news?${query}`)
        const newProblems = newRequest.data.data
        data.value = newProblems.data.map((news: any) => ({
          id: news.id,
          name: news.name,
          description: news.description
        }))
        total.value = newProblems.total
        page.value = newProblems.page
        loadingTable.value = false
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
        loadingTable.value = false
      }
    }

    const onClickDeleteNew = async () => {
      try {
        await context.$axios.delete(`/news/${deleteID.value}`)
        deleteModalValue.value = false
        deleteID.value = 0
        fetchNews()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    }

    const deleteNew = (id: number) => {
      deleteModalValue.value = true
      deleteID.value = id
    }

    fetchNews()

    return {
      headers,
      loadingTable,
      total,
      options,
      page,
      data,
      deleteModalValue,
      deleteNew,
      onClickDeleteNew
    }
  }
})
</script>
