const authorization = ({
  redirect
}) => {
  const accessToken = localStorage.getItem('access_token')
  if (!accessToken) {
    redirect('/login')
  }
}

export default authorization
