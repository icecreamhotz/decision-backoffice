export default {
  page: {
    index: {
      title: 'ธุรกิจของคุณ',
      subTitle: 'เลือกธุรกิจของคุณ เพื่อเริ่มต้นใช้งาน',
      addButtonText: 'เพิ่มธุรกิจ',
      role: {
        MANAGER: 'เจ้าของ',
        EMPLOYEE: 'ผู้ดูแล'
      }
    },
    stepWizard: {
      tab: {
        stepOne: 'ข้อมูลธุรกิจ',
        stepTwo: 'ตั้งค่า Line Messenging API',
        stepThree: 'สำเร็จ'
      },
      tabOne: {
        line1: 'Step 1',
        line2: 'ข้อมูลธุรกิจ',
        line3: 'กรุณากรอกข้อมูลธุรกิจของคุณและดำเนินการต่อในขั้นตอนต่อไป',
        line4: 'กรอกข้อมูลธุรกิจ',
        input: {
          businessName: 'ชื่อธุรกิจ',
          businessNamePlaceholder: 'ระบุชื่อธุรกิจ',
          tel: 'เบอร์โทร',
          telPlaceholder: 'ระบุเบอร์โทร',
          preTextUrl: 'https://coconutt.co/',
          url: 'URL ของธุรกิจ',
          urlPlaceholder: 'URL ของธุรกิจ',
          logo: 'โลโก้',
          titleLogo: '+ อัพโหลดโลโก้',
          subTitleLogo: 'ขนาดไฟล์ไม่เกิน 5 MB - รองรับไฟล์ .jpg และ .png',
          errors: {
            duplicateSlug: 'ชื่อ URL ซ้ำ กรุณาเลือกชื่ออื่น'
          }
        },
        selectBusiness: 'เลือกประเภทธุรกิจ'
      },
      tabTwo: {
        line1: 'Step 2',
        line2: 'ตั้งค่า Line Messaging API',
        line3: 'กรุณาทำตามขั้นตอนที่แนะนำเพื่อเปิดการใช้งาน',
        sectionOne: {
          title: 'ขั้นตอนที่ 1',
          subTitle: 'สร้างบัญชี Line Official Account',
          line1: 'กรณีมีบัญชีแล้ว',
          line2: '1. ไปที่',
          line2More: 'https://manager.line.biz/',
          line3: '2. เลือกบัญชีธุรกิจที่คุณต้องการ',
          line4: '3. ข้ามขั้นตอนไปยัง',
          skipToSectionTwo: 'ขั้นตอนที่ 2',
          line5: 'กรณียังไม่มีบัญชี',
          line6: '1. ไปที่',
          line7: '2. ทำการ login เข้าสู่ระบบ line',
          line8: '3. คลิก',
          line8More: '"สร้างบัญชีทางการ Line"',
          line9: '4. กรอกข้อมูล',
          line10: '- ชื่อบัญชี : ระบุชื่อของ Line OA ของธุรกิจ',
          line11: '- อีเมล : ระบุอีเมลของธุรกิจ',
          line12: '- หมวดหมู่ธุรกิจ : ให้เลือกหมวดหมู่ธุรกิจของคุณ',
          line13: '- คลิก',
          line13More: '"ดำเนินการต่อ"',
          line14: '- ทำตามขั้นตอนจนสิ้นสุดกระบวนการสร้าง Line OA',
          line15: '5. คลิก',
          line15More: '"ไป Line Official Account Manager"',
          line16: '6. ทำ',
          line16More: 'ต่อไป'
        },
        sectionTwo: {
          title: 'ขั้นตอนที่ 2',
          subTitle: 'เปิดการใช้ Line Messaging API',
          line1: '1. คลิก',
          line1More: '"ตั้งค่า"',
          line2: '2. เลือก',
          line2More: '"เมนู Messaging API"',
          line3: '3. คลิก',
          line3More: '"ใช้ Messaging API"',
          line4: '4. เลือก',
          line4More: '"สร้างโพรไวเดอร์"',
          line4More2: 'และกรอกชื่อโพรไวเดอร์',
          line5: '5. คลิก',
          line5More: '"ตกลง"',
          line5More2: 'เพื่อข้ามขั้นตอนการกำหนดนโยบายและข้อกำหนด',
          line6: '6. คัดลอก',
          line6More: '"Channel ID"',
          line6More2: 'และ',
          line6More3: '"Channel Secret"',
          line6More4: 'และนำมากรอกใน',
          line6More5: 'ขั้นตอนที่ 3'
        },
        sectionThree: {
          title: 'ขั้นตอนที่ 3',
          subTitle: 'กรอก Channel ID และ Channel Secret',
          description: '*นำ Channel ID และ Channel Secret ที่ได้จาก',
          descriptionMore: 'ขั้นตอนที่ 2',
          descriptionMore2: 'มากรอกในช่องด้านล่าง',
          input: {
            channelID: 'Channel ID (แชนแนล ID)',
            channelIDPlaceholder: 'Channel ID (แชนแนล ID)',
            channelSecret: 'Channel Secret (ความลับแชนแนล)',
            channelSecretPlaceholder: 'Channel Secret (ความลับแชนแนล)'
          }
        },
        sectionFour: {
          title: 'ขั้นตอนที่ 4',
          subTitle: 'เปิดใช้งาน Rich Menu',
          input: {
            acceptPlatformRichMenu: 'ใช้งาน Rich Menu ของ coconutt'
          },
          description: 'สามารถเลือกใช้งานระหว่าง Rich Menu ของธุรกิจ หรือ ของ coconutt และ สามารถเปลี่ยนการใช้งานนี้ได้ภายหลัง'
        },
        errorBadRequest: 'กรุณาตรวจสอบข้อมูล Channel ID หรือ Channel Secret อีกครั้ง'
      },
      tabThree: {
        line1: 'Step 3',
        title: 'สร้างธุรกิจสำเร็จแล้ว !',
        subTitle: 'คุณสามารถเริ่มต้นใช้งาน ได้เลย',
        button: 'เสร็จสิ้น'
      }
    },
    businessSetup: {
      title: 'ตั้งค่าข้อมูลธุรกิจ',
      leftSection: {
        title: 'ข้อมูลธุรกิจ',
        input: {
          businessName: 'ชื่อธุรกิจ',
          businessNamePlaceholder: 'ระบุชื่อสาขา',
          businessType: 'ประเภทธุรกิจ',
          businessTypePlaceholder: 'เลือกประเภทธุรกิจ',
          urlTitle: 'URL',
          url: 'URL ของธุรกิจ',
          urlPlaceholder: 'URL ของธุรกิจ',
          preTextUrl: 'https://coconutt.co/',
          businessInfo: 'ข้อมูลธุรกิจ',
          tel: 'เบอร์โทร',
          telPlaceholder: 'ระบุเบอร์โทร',
          addTel: '+ เพิ่มเบอร์โทรศัพท์',
          logoTitle: 'โลโก้ธุรกิจ',
          logo: 'โลโก้',
          titleLogo: '+ อัพโหลดโลโก้',
          subTitleLogo: 'ขนาดไฟล์ไม่เกิน 5 MB - รองรับไฟล์ .jpg และ .png',
          errors: {
            duplicateSlug: 'ชื่อ URL ซ้ำ กรุณาเลือกชื่ออื่น'
          }
        }
      },
      rightSection: {
        title: 'ที่อยู่ธุรกิจ',
        input: {
          address: 'ที่อยู่',
          addressPlaceholder: 'ระบุที่อยู่',
          province: 'จังหวัด',
          provincePlaceholder: 'ระบุจังหวัด',
          district: 'เขต/อำเภอ',
          districtPlaceholder: 'ระบุเขต/อำเภอ',
          subDistrict: 'แขวง/ตำบล',
          subDistrictPlaceholder: 'ระบุแขวง/ตำบล',
          postcode: 'รหัสไปรษณีย์',
          postcodePlaceholder: 'ระบุรหัสไปรษณีย์',
          mapPlaceholder: 'ค้นหาที่อยู่ธุรกิจของคุณ'
        }
      },
      button: 'บันทึก',
      successTransaction: 'บันทึกข้อมูลสำเร็จ'
    },
    service: {
      title: 'จัดการแพทย์',
      addButtonText: 'เพิ่มแพทย์',
      filter: {
        searchInput: 'ค้นหาจากชื่อแพทย์',
        searchDropdown: 'เลือกความเชี่ยวชาญแพทย์',
        selectAllText: 'เลือกทั้งหมด'
      },
      table: {
        title1: 'ชื่อแพทย์',
        title2: 'ประเภทความเชี่ยวชาญ',
        title3: 'วันที่ทำการ',
        title4: 'สถานะ',
        title5: 'จัดการ',
        manage: {
          editInfo: 'แก้ไขข้อมูลแพทย์',
          editWorkingDay: 'แก้ไขตารางนัดหมาย',
          delete: 'ลบ'
        }
      },
      deleteModal: {
        title: 'ยืนยันการลบรายการ',
        description: 'คุณต้องการที่จะลบรายการนี้ใช่หรือไม่ ?'
      },
      successTransaction: 'บันทึกข้อมูลสำเร็จ'
    },
    category: {
      title: 'จัดการประเภทความเชี่ยวชาญ',
      addButtonText: 'เพิ่มประเภทความเชี่ยวชาญ',
      filter: {
        searchInput: 'ค้นหาจากชื่อประเภทความเชี่ยวชาญ'
      },
      table: {
        title1: 'ชื่อประเภทความเชี่ยวชาญ',
        title2: 'จัดการ'
      },
      deleteModal: {
        title: 'ยืนยันการลบประเภทความเชี่ยวชาญ',
        description: 'คุณต้องการที่จะลบประเภทความเชี่ยวชาญนี้ใช่หรือไม่ ?'
      },
      successTransaction: 'บันทึกข้อมูลสำเร็จ',
      errors: {
        otherServiceUsingCategory: 'ไม่สามารถลบข้อมูลได้ เนื่องจากมีบริการอื่นใช้ประเภทความเชี่ยวชาญนี้อยู่'
      }
    },
    workingTime: {
      title: 'ตั้งค่าเวลาทำการธุรกิจ',
      addButtonText: 'เพิ่มเวลาทำการ',
      input: {
        acceptMultipleService: 'อนุญาตให้ลูกค้าสามารถเลือกใช้บริการในหลายช่วงเวลา'
      },
      table: {
        title1: 'เวลาทำการ',
        title2: 'จัดการ'
      },
      deleteModal: {
        title: 'ยืนยันการลบเวลาทำการ',
        description: 'คุณต้องการที่จะลบเวลาทำการนี้ใช่หรือไม่ ?'
      },
      aliasUnitTime: 'น.',
      successTransaction: 'บันทึกข้อมูลสำเร็จ',
      errors: {
        otherServiceWorkingTimeUsingCurrent: 'ไม่สามารถลบข้อมูลได้ เนื่องจากมีบริการอื่นใช้เวลาทำการนี้อยู่'
      }
    },
    holiday: {
      title: 'จัดการวันหยุด',
      addButtonText: 'เพิ่มวันหยุด',
      filter: {
        searchNameInput: 'ค้นหาจากชื่อแพทย์',
        searchDateInput: 'ค้นหาวันที่หยุดทำการ'
      },
      table: {
        title1: 'วันที่หยุดทำการ',
        title2: 'ชื่อแพทย์',
        title3: 'หมายเหตุ',
        title4: 'จัดการ'
      },
      deleteModal: {
        title: 'ยืนยันการลบวันหยุดทำการ',
        description: 'คุณต้องการที่จะลบวันหยุดทำการนี้ใช่หรือไม่ ?'
      }
    },
    lineLiff: {
      title: 'ตั้งค่า Line Liff',
      input: {
        usePlatformRichMenu: 'ใช้ Rich menu ของ coconutt',
        endpointURL: 'Endpoint URL',
        liffURL: 'Liff URL'
      },
      indexTitle: 'หน้าแรก',
      appointmentTitle: 'ประวัติการนัดหมาย',
      copySuccess: 'คัดลอกสำเร็จ',
      successTransaction: 'บันทึกข้อมูลสำเร็จ'
    },
    lineOA: {
      title: 'ตั้งค่าการแจ้งเตือน Line OA',
      input: {
        channelID: 'Channel ID (แชนแนล ID)',
        channelIDPlaceholder: 'Channel ID (แชนแนล ID)',
        channelSecret: 'Channel Secret (ความลับแชนแนล)',
        channelSecretPlaceholder: 'Channel Secret (ความลับแชนแนล)'
      },
      button: 'บันทึก',
      successTransaction: 'บันทึกข้อมูลสำเร็จ'
    },
    user: {
      title: 'จัดการผู้ใช้งาน',
      addButtonText: 'เพิ่มผู้ใช้งาน',
      filter: {
        searchNameInput: 'ค้นหาจากชื่อผู้ใช้งาน',
        searchRoleDropdown: 'เลือกประเภทสิทธิ์'
      },
      table: {
        title1: 'ชื่อผู้ใช้งาน',
        title2: 'สิทธิ์',
        title3: 'สถานะ',
        title4: 'จัดการ'
      },
      role: {
        ALL: 'ทั้งหมด',
        MANAGER: 'เจ้าของ',
        EMPLOYEE: 'ผู้ดูแล'
      },
      deleteModal: {
        title: 'ยืนยันการลบผู้ใช้งาน',
        description: 'คุณต้องการที่จะลบผู้ใช้งานใช่หรือไม่ ?'
      },
      copySuccess: 'คัดลอกสำเร็จ',
      successTransaction: 'บันทึกข้อมูลสำเร็จ'
    }
  }
}
