import { Plugin } from '@nuxt/types'

interface IRoutePush {
  name: string,
  params?: any,
  query?: any,
  callback?: () => void
}

declare module '@nuxt/types' {
  interface Context {
    $routePush({
      name,
      params,
      query,
      callback
    }: IRoutePush): void
    $copyText(value: string) : void
  }
}

const plugin: Plugin = (context, inject) => {
  inject('routePush', ({
    name = '',
    params = null,
    query = null,
    callback = () => {}
  }: IRoutePush) :void => {
    context.app.router!.push(context.app.localePath({
      name,
      params: params || {},
      query: query || context.query
    }), callback)
  })

  inject('copyText', (value: string) :void => {
    const el = document.createElement('textarea')
    el.addEventListener('focusin', e => e.stopPropagation())
    el.value = value
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  })
}

export default plugin
