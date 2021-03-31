export default {
  components: {
    button: {
      submitButton: {
        defaultText: 'ยืนยัน'
      },
      linkButton: {
        defaultText: 'กลับไปหน้าแรก'
      },
      commonButton: {
        defaultText: 'ยืนยัน'
      },
      nextButton: {
        defaultText: 'ถัดไป'
      },
      previousButton: {
        defaultText: 'ก่อนหน้า'
      }
    },
    input: {
      copyText: 'คัดลอก'
    },
    navbar: {
      logoutText: 'คุณต้องการออกจากระบบหรือไม่ ?'
    },
    serviceManageModal: {
      stepper: {
        one: 'ข้อมูลแพทย์',
        two: 'ตารางนัดหมาย',
        three: 'สำเร็จ'
      },
      button: {
        cancel: 'ยกเลิก',
        previous: 'ก่อนหน้า',
        next: 'ดำเนินการต่อ',
        success: 'เสร็จสิ้น'
      },
      stepTwoNotHasOneValueInDay: 'กรุณากรอก slot เวลาอย่างน้อย 1 เวลา'
    },
    serviceFormStepOne: {
      stepTitle: 'ข้อมูลแพทย์',
      input: {
        name: 'ชื่อแพทย์',
        namePlaceholder: 'ระบุชื่อแพทย์',
        type: 'ประเภทความเชี่ยวชาญ',
        typePlaceholder: 'เลือกประเภทความเชี่ยวชาญ',
        description: 'รายละเอียด',
        descriptionPlaceholder: 'ระบุรายละเอียด',
        uploadImage: 'รูปแพทย์',
        titleUploadImage: '+ อัพโหลดรูปแพทย์',
        subTitleUploadImage: 'สี่เหลี่ยมจัตุรัส ขนาดไฟล์ไม่เกิน 10 MB - รองรับไฟล์ .jpg และ .png'
      },
      titleImage: 'รูปแพทย์'
    },
    serviceFormStepTwo: {
      stepTitle: 'ตารางนัดหมาย',
      nameTitle: 'ชื่อแพทย์',
      dayTitle: 'วันทำการแพทย์',
      dayLabel: {
        sun: 'อาทิตย์',
        mon: 'จันทร์',
        tue: 'อังคาร',
        wed: 'พุธ',
        thu: 'พฤหัสบดี',
        fri: 'ศุกร์',
        sat: 'เสาร์'
      },
      dayAlias: {
        sun: 'อา',
        mon: 'จ',
        tue: 'อ',
        wed: 'พ',
        thu: 'พฤ',
        fri: 'ศ',
        sat: 'ส'
      }
    },
    confirmModal: {
      cancelBtnText: 'ยกเลิก',
      successBtnText: 'ยืนยัน'
    },
    categoryFormModal: {
      addTitle: 'เพิ่มประเภทความเชี่ยวชาญ',
      editTitle: 'แก้ไขประเภทความเชี่ยวชาญ',
      input: {
        category: 'ชื่อประเภทความเชี่ยวชาญ',
        categoryPlaceholder: 'ระบุประเภทความเชี่ยวชาญ'
      },
      submitBtnText: 'บันทึก',
      errors: {
        duplicateName: 'ชื่อซ้ำ กรุณาเลือกชื่อใหม่'
      }
    },
    workingTimeFormModal: {
      addTitle: 'เพิ่มเวลาทำการ',
      editTitle: 'แก้ไขเวลาทำการ',
      input: {
        startTime: 'เวลาเริ่มต้น',
        endTime: 'เวลาสิ้นสุด'
      },
      submitBtnText: 'บันทึก'
    },
    holidayFormModal: {
      addTitle: 'เพิ่มวันหยุด',
      editTitle: 'แก้ไขข้อมูลวันหยุด',
      input: {
        name: 'ชื่อแพทย์',
        namePlaceholder: 'เลือกแพทย์',
        date: 'ช่วงวันหยุด',
        datePlaceholder: 'ระบุช่วงวันหยุด',
        description: 'หมายเหตุ',
        descriptionPlaceholder: 'ระบุหมายเหตุ'
      },
      submitBtnText: 'บันทึก'
    },
    dataTable: {
      manager: {
        common: {
          line1: 'แก้ไข',
          line2: 'ลบ'
        },
        service: {
          line1: 'แก้ไขข้อมูลแพทย์',
          line2: 'แก้ไขตารางนัดหมาย',
          line3: 'ลบ'
        }
      }
    },
    cropImage: {
      title: 'ปรับขนาดภาพ',
      cancelButton: 'ยกเลิก',
      acceptButton: 'ตกลง'
    },
    serviceFormStepThree: {
      leftSection: {
        title: 'สรุปข้อมูลแพทย์',
        seemore: 'แสดงข้อมูลทั้งหมด'
      },
      rightSection: {
        title: 'ตารางนัดหมาย',
        day: 'วัน',
        time: 'เวลา',
        slot: 'จำนวนรับ'
      },
      aliasUnitTime: 'น.'
    },
    editServiceInfoModal: {
      title: 'แก้ไขข้อมูลแพทย์',
      successBtnText: 'บันทึก'
    },
    addUserFormModal: {
      title: 'เพิ่มผู้ใช้งาน',
      editTitle: 'แก้ไขผู้ใช้งาน',
      btnInnerRightText: 'ออกลิงค์',
      submitBtnText: 'บันทึก'
    }
  }
}
