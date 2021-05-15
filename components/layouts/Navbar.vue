<template>
  <div>
    <v-app-bar
      v-if="!hideSidebar"
      app
      :clipped-left="$vuetify.breakpoint.lgAndUp"
      color="primary"
    >
      <v-app-bar-nav-icon class="d-md-block d-lg-none white--text" @click="drawer = !drawer" />
      <div class="text-h1 white--text">
        Decision System
      </div>
      <v-spacer />
      <div
        class="d-flex align-center"
      >
        <span class="text-h5 white--text mr-3">{{ $store.state.navbar.name || '' }}</span>
        <v-avatar size="30">
          <img
            :src="$store.state.navbar.logo || `/images/user-icon.png`"
            class="cursor-pointer"
          >
        </v-avatar>
      </div>
    </v-app-bar>

    <v-navigation-drawer
      v-if="!hideSidebar"
      v-model="drawer"
      clipped
      app
    >
      <v-list
        nav
        dense
        flat
      >
        <template v-for="menu in menus">
          <v-list-group
            v-if="menu.children.length > 0"
            :key="menu.text"
            v-model="menu.model"
            :prepend-icon="menu.icon"
            :to="menu.route"
            class="pb-2"
          >
            <template #activator>
              <v-list-item-title>
                {{ menu.text }}
              </v-list-item-title>
            </template>
            <v-list-item
              v-for="child in menu.children"
              :key="child.text"
              :to="child.route"
              nuxt
            >
              <v-list-item-action>
                <v-icon>
                  {{ child.icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  {{ child.text }}
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>

          <v-list-item
            v-else-if="menu.route !== '/logout'"
            :key="menu.text"
            :to="menu.route"
            nuxt
            active-class="primary--text"
          >
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ menu.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item
            v-else
            :key="menu.text"
            nuxt
            active-class="primary--text"
            @click="logoutConfirm = true"
          >
            <v-list-item-action>
              <v-icon>{{ menu.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>
                {{ menu.text }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>
    <ConfirmModalComponent
      v-model="logoutConfirm"
      :text="$t('components.navbar.logoutText')"
      @success="logout"
    />
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, useContext, useRoute, useRouter } from '@nuxtjs/composition-api'

export default defineComponent({
  setup () {
    const context = useContext()
    const route = useRoute()
    const router = useRouter()
    const drawer = ref<boolean>(true)
    const logoutConfirm = ref<boolean>(false)
    const menus = ref([])
    const hideSidebar = computed(() => {
      return route.value.name === 'login___th'
    })

    const fetchInititalValue = async () => {
      try {
        const sidebarRequest = await context.$axios.get('/sidebar')
        menus.value = sidebarRequest.data.data.map((m: any) => ({
          ...m,
          model: m.children
            ? m.children.some((menu:any) => {
                const routePattern = new RegExp(menu.route)
                return routePattern.test(route.value.path)
              })
            : null
        }))
      } catch (err) {
        context.store.commit('alert/show', { type: 'error', message: err })
      }
    }

    const logout = () => {
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('type')
      router.push('/login')
    }

    if (!hideSidebar.value) {
      fetchInititalValue()
    }

    drawer.value = window.innerWidth > 960

    return {
      menus,
      hideSidebar,
      logoutConfirm,
      logout,
      drawer
    }
  }
})
</script>

<style lang="scss">
.v-navigation-drawer {
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
}
.theme--light.v-navigation-drawer:not(.v-navigation-drawer--floating) .v-navigation-drawer__border {
  background-color: transparent !important;
}
</style>
