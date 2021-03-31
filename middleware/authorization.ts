import { Middleware } from '@nuxt/types'

let isRefreshed = false

const authorization: Middleware = async (context) => {
  if (!isRefreshed) {
    const accessToken = localStorage.getItem('token') || ''
    if (!accessToken) {
      window.location.href = context.env.LINE_REDIRECT_URL
    }
    try {
      const res = await context.$axios.post('/auth/refresh-token')
      window.localStorage.setItem('token', res.data.data.token)
      window.localStorage.setItem('type', res.data.data.type)
    } catch {
      window.location.href = context.env.LINE_REDIRECT_URL
    }
    isRefreshed = true
  }
}

export default authorization
