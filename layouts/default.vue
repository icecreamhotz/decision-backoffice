<template>
  <v-app id="inspire">
    <PageLoading />
    <Message />
    <Navbar :menu="menus()" />
    <v-container fluid>
      <v-main>
        <nuxt />
      </v-main>
    </v-container>
  </v-app>
</template>

<script>
import { Message } from '~/components/alert'
import { PageLoading } from '~/components/loading'
import { Navbar } from '~/components/navbar'

export default {
  middleware: 'authorization',
  components: {
    Navbar,
    PageLoading,
    Message
  },
  async beforeCreate () {
    await this.$store.dispatch('users/getUserData')
  },
  methods: {
    menus () {
      // sub menus of each menu
      const indexSubMenu = [
        { text: 'จัดการแบนเนอร์', route: '/home/banners' },
        { text: 'จัดการข้อมูลแนะนำ', route: '/home/recommended-info' },
        { text: 'จัดการวิดีโอแนะนำ', route: '/home/recommended-video' },
        { text: 'จัดการ SEO หน้าแรก', route: '/home/seo' }
      ]

      // List of menus
      const menus = [
        {
          icon: 'mdi-home-outline',
          'icon-alt': 'mdi-home-outline',
          text: 'หน้าหลัก',
          model: indexSubMenu.some((menu) => {
            const routePattern = new RegExp(menu.route)
            return routePattern.test(this.$route.path)
          }),
          children: indexSubMenu
        },
        {
          icon: 'mdi-information-outline',
          'icon-alt': 'mdi-information-outline',
          text: 'เกี่ยวกับเรา',
          route: '/about-us'
        },
        {
          icon: 'mdi-image-outline',
          'icon-alt': 'mdi-image-outline',
          text: 'นิทรรศการ',
          route: '/exhibitions'
        },
        {
          icon: 'mdi-calendar-blank',
          'icon-alt': 'mdi-calendar-blank',
          text: 'กิจกรรม',
          route: '/events'
        },
        {
          icon: 'mdi-help-circle-outline',
          'icon-alt': 'mdi-help-circle-outline',
          text: 'คำถามที่พบบ่อย',
          route: '/faq'
        },
        {
          icon: 'mdi-phone-outline',
          'icon-alt': 'mdi-phone-outline',
          text: 'ข้อมูลการติดต่อ',
          route: '/contacts'
        },
        {
          icon: 'mdi-account-outline',
          'icon-alt': 'mdi-account-outline',
          text: 'ผู้ใช้งาน',
          route: '/users'
        }
      ]
      return menus
    }

  }
}
</script>
