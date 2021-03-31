import alertInterface from './types'

export default {
  setNavbar (state: alertInterface, payload: {
    name: string,
    logo: string
  }) {
    state.name = payload.name
    state.logo = payload.logo
  }
}
