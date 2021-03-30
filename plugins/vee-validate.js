import { extend } from 'vee-validate'
import {
  required, email, confirmed, max, min, digits, image, size, mimes
} from 'vee-validate/dist/rules'

extend('required', {
  ...required,
  message: 'กรุณากรอก {_field_}'
})

extend('mimes', {
  ...mimes,
  message: 'กรุณาอัปโหลดไฟล์เฉพาะนามสกุล {_field_}'
})

extend('digits', {
  ...digits,
  message: 'กรุณากรอก {_field_} เป็นตัวเลข ไม่ต่ำกว่า {length} ตัวอักษร'
})

extend('min', {
  ...min,
  message: 'กรุณากรอก {_field_} ไม่ต่ำกว่า {length} ตัวอักษร'
})

extend('max', {
  ...max,
  message: 'กรุณากรอก {_field_} ไม่เกิน {length} ตัวอักษร'
})

extend('email', {
  ...email,
  message: 'กรุณากรอกรูปแบบอีเมลให้ถูกต้อง'
})

extend('confirmed', {
  ...confirmed,
  message: 'ยืนยันรหัสผ่านไม่ถูกต้อง'
})

extend('slug', {
  validate: (str) => {
    const pattern = new RegExp(/^[a-zA-Z0-9ก-๙-]+(?:-[a-zA-Z0-9ก-๙-]+)*$/)
    return !!pattern.test(str)
  },
  message: 'รูปแบบ slug ไม่ถูกต้อง'
})

extend('url', {
  validate: (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = new RegExp(/(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9ก-๙@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&=]*)/)
    return !!pattern.test(str)
  },
  message: 'รูปแบบ url ไม่ถูกต้อง'
})

extend('facebook_url', {
  validate: (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = new RegExp(/(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/.+/i)
    return !!pattern.test(str)
  },
  message: 'รูปแบบ facebook url ไม่ถูกต้อง'
})

extend('number_price', {
  validate: (str) => {
    const pattern = new RegExp(/^[0-9]+(\.[0-9][0-9]?)*$/g)
    return !!pattern.test(str)
  },
  message: 'กรุณากรอกเป็นตัวเลขจำนวนเต็มและทศนิยมไม่เกิน 2 ตำแหน่ง'
})

extend('number', {
  validate: (str) => {
    const pattern = new RegExp(/^[0-9]*$/g)
    return !!pattern.test(str)
  },
  message: 'กรุณากรอกเป็นตัวเลขเท่านั้น'
})

extend('decimal', {
  ...max,
  message: 'กรุณากรอกเป็นตัวเลขที่ทศนิยมไม่เกิน {length} ตำแหน่ง'
})

extend('image', {
  ...image,
  message: 'กรุณาอัพโหลดไฟล์รูปภาพเท่านั้น'
})

extend('size', {
  ...size,
  message: (_, { size: maxSixe }) => {
    const kiloByteToMegaByte = Math.floor(maxSixe / 1024)
    return `กรุณาเลือกไฟล์ที่มีขนาดไม่เกิน ${kiloByteToMegaByte} MB`
  }
})

extend('non-url', {
  validate: (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = new RegExp(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)
    return !pattern.test(str)
  },
  message: 'กรุณากรอกเฉพาะ ID'
})

extend('youtube-url', {
  validate: (str) => {
    // eslint-disable-next-line no-useless-escape
    const pattern = new RegExp(/^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/)
    return !!pattern.test(str)
  },
  message: 'กรุณากรอกเฉพาะ Youtube URL'
})
