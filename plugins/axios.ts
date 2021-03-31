import { Plugin } from '@nuxt/types'
import { NuxtAxiosInstance } from '@nuxtjs/axios'
import { AxiosError, AxiosRequestConfig } from 'axios'

let loading = 0
const loadingFinished = (): void => {
  if (process.client) {
    const element = document.getElementById('page-loading')
    if (element) {
      loading -= 1
      if (loading < 0) {
        loading = 0
      }
      if (loading === 0) {
        element.style.display = 'none'
      }
    }
  }
}

const axios: Plugin = (inst) => {
  const axiosInst: NuxtAxiosInstance = inst.$axios

  axiosInst.onRequest((config: AxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.common.Authorization = `Bearer ${localStorage.getItem('token')}`
    }
    if (loading === 0) {
      const element = document.getElementById('page-loading')
      if (element) {
        element.style.display = 'flex'
        loading += 1
      }
    }
  })

  axiosInst.onResponse(() => {
    loadingFinished()
  })

  axiosInst.onError((error: AxiosError) => {
    loadingFinished()
    const code = error.response!.status
    if (code === 401) {
      window.location.href = inst.env.LINE_REDIRECT_URL
    } else {
      throw error
    }
  })
}

export default axios
