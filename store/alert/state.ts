import alertInterface from './types'

export default () :alertInterface => ({
  show: false,
  type: 'success',
  error: null,
  message: ''
})
