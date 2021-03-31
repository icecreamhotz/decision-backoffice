import Component from './components/th'
import Pages from './pages/th'

module.exports = {
  ...Component,
  ...Pages,
  validations: {
    slug: 'กรุณากรอกตัวอักษร a-z หรือ 0-9 เท่านั้น'
  }
}
