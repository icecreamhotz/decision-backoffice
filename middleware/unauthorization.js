const unauthorization = ({
  redirect
}) => {
  const accessToken = localStorage.getItem('access_token')
  if (accessToken) {
    redirect('/')
  }
}

export default unauthorization
