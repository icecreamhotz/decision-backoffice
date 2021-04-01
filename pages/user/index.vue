<template>
  <div>
    <CardContainer>
      <CardContent title="จัดการผู้ใช้งานระบบ">
        <template slot="action">
          <AddButton
            btn-text="เพิ่มผู้ใช้ระบบ"
            :block="$vuetify.breakpoint.xsOnly"
            @click="$router.push('/user/add')"
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
                @edit="id => $router.push(`/user/${id}`)"
                @delete="deleteUser"
              />
            </v-col>
          </v-row>
        </template>
      </CardContent>
    </CardContainer>
    <ConfirmModalComponent
      v-model="deleteModalValue"
      title="ยืนยันการลบข้อมูลผู้ใช้ระบบ"
      text="คุณต้องการที่จะลบข้อมูลผู้ใช้ระบบใช่หรือไม่"
      @success="onClickDeleteUser"
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
        text: 'อีเมล', value: 'email', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'ชื่อ', value: 'firstname', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'นามสกุล', value: 'lastname', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'เบอร์โทรศัพท์', value: 'tel', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'สิทธิการใช้งาน', value: 'role', sortable: false, width: '100px', align: 'left'
      },
      {
        text: 'จัดการ', value: 'manager', sortable: false, width: '60px', align: 'left'
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
          fetchUsers()
        } else {
          isFirstLoad.value = false
        }
      }
    )

    const fetchUsers = async () => {
      try {
        const query = stringify({
          page: options.value.page,
          perPage: options.value.itemsPerPage
        })
        const userRequest = await context.$axios.get(`/users?${query}`)
        const users = userRequest.data.data
        data.value = users.data.map((user: any) => ({
          id: user.id,
          email: user.email,
          firstname: user.firstname,
          lastname: user.lastname,
          tel: user.tel,
          role: user.role === 'ADMIN' ? 'ผู้ดูแลระบบ' : 'เจ้าหน้าที่ห้องทะเบียน'
        }))
        total.value = users.total
        page.value = users.page
        loadingTable.value = false
      } catch (error) {
        context.store.commit('alert/show', { type: 'error', message: error })
        loadingTable.value = false
      }
    }

    const onClickDeleteUser = async () => {
      try {
        await context.$axios.delete(`/users/${deleteID.value}`)
        deleteModalValue.value = false
        deleteID.value = 0
        fetchUsers()
        context.store.commit('alert/show', { type: 'success', message: 'ทำรายการสำเร็จ' })
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    }

    const deleteUser = (id: number) => {
      deleteModalValue.value = true
      deleteID.value = id
    }

    fetchUsers()

    return {
      headers,
      loadingTable,
      total,
      options,
      page,
      data,
      deleteModalValue,
      deleteUser,
      onClickDeleteUser
    }
  }
})
</script>
