let loading = 0

const loadingFinished = () => {
  loading -= 1
  if (loading === 0) {
    document.getElementById('page-loading').style.display = 'none'
  }
}

const axiosConfig = ({
  $axios,
  redirect,
  error
}) => {
  $axios.onRequest((config) => {
    const token = localStorage.getItem('access_token')
    config.headers.common['Authorization'] = `Bearer ${token}` //eslint-disable-line
    document.getElementById('page-loading').style.display = 'flex'
    loading += 1
  })

  $axios.onResponse(() => {
    loadingFinished()
  })

  $axios.onError((errorResponse) => {
    loadingFinished()
    const code = parseInt(errorResponse.response.status, 10)

    if (code === 404) {
      redirect('/404')
    }
    if (code === 401) {
      localStorage.removeItem('refresh_token')
      localStorage.removeItem('token_type')
      localStorage.removeItem('access_token')
      localStorage.removeItem('token_expired')
      return redirect('/login')
    }
    if (code === 500) { throw errorResponse.response.data }
    const err = {
      statusCode: code,
      message: errorResponse.response.data.message,
      errors: errorResponse.response.data.errors || null
    }
    throw err
  })
}

export default axiosConfig
