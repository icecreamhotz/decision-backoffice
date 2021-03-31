import alertInterface from './types'

export default {
  show (state: alertInterface, payload: { type: 'error' | 'success', error: any, message: string }) {
    state.show = true
    state.type = payload.type || 'success'
    state.error = payload.error || null
    let finalMessage:string = payload.message
    if (payload.error && payload.type === 'error' && !payload.message) {
      const { data } = payload.error.response
      const { message } = data.error || data
      finalMessage = message
    }
    state.message = finalMessage
  },
  close (state: alertInterface) {
    state.show = false
  }
}
