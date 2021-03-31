import Vue from 'vue'

import {
  ValidationProvider,
  ValidationObserver,
  extend,
  localize
} from 'vee-validate'

import {
  // eslint-disable-next-line camelcase
  required, email, max, min, integer, image, size, between, min_value, max_value
} from 'vee-validate/dist/rules'
import th from 'vee-validate/dist/locale/th.json'
import en from 'vee-validate/dist/locale/en.json'

export default function (context: any) {
  const locale = context.app.i18n.locale
  extend('required', required)
  extend('integer', integer)
  extend('min', min)
  extend('max', max)
  extend('email', email)
  extend('image', image)
  extend('size', size)
  extend('between', between)
  extend('min_value', min_value)
  extend('max_value', max_value)
  extend('slug', {
    validate: (value) => {
      // eslint-disable-next-line prefer-regex-literals
      const pattern = new RegExp(/^[a-z0-9]+$/)
      return !!pattern.test(value)
    },
    message: context.app.i18n.t('validations.slug')
  })
  localize(locale, locale === 'th' ? th : en)
}

Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)
