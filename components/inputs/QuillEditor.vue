<template>
  <ValidationProvider v-slot="{ errors, validate }" :name="name" :rules="rules">
    <div :class="`w-100 px-0 mx-0 ${shortEditor ? 'short-editor' : ''}`">
      <span class="danger--text">{{ errors[0] }}</span>
      <div class="quill-input-wrapper">
        <input :id="`getFile${name}`" type="file" hidden @change="uploadFunction($event)">
        <quillEditor
          :ref="`myQuillEditor${name}`"
          :options="editorOption"
          :content="contentValue"
          :disabled="disabled"
          style="min-height:400px;"
          @change="($event) => { validate($event.html);onEditorChange($event) }"
        />
        <AlertText v-if="errorMessage" :message="errorMessage" status="error" />
      </div>
    </div>
  </ValidationProvider>
</template>

<script>
import { quillEditor } from 'vue-quill-editor'
import { ValidationProvider } from 'vee-validate'
import AlertText from '~/components/alert/AlertText'

export default {
  components: {
    AlertText,
    quillEditor,
    ValidationProvider
  },
  props: {
    content: {
      type: String,
      default: ''
    },
    upImage: {
      type: Boolean,
      default: false
    },
    editorLabel: {
      type: String,
      default: 'กรอกรายละเอียด'
    },
    isMedia: {
      type: Boolean,
      default: true
    },
    isBasic: {
      type: Boolean,
      default: false
    },
    isBasicLink: {
      type: Boolean,
      default: false
    },
    name: {
      type: String,
      default: null
    },
    rules: {
      type: String,
      default: ''
    },
    shortEditor: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOldValueFilled: false,
      contentValue: this.content,
      loading: true,
      editorOption: {
        placeholder: this.editorLabel,
        modules: {
          toolbar: {
            container: this.isBasic ? [['bold', 'italic', 'underline', 'strike'], this.isBasicLink ? ['link'] : []] : [
              ['bold', 'italic', 'underline', 'strike'],
              ['blockquote', 'code-block'],
              [{ header: 2 }],
              [{ list: 'ordered' }, { list: 'bullet' }],
              [{ script: 'sub' }, { script: 'super' }],
              [{ indent: '-1' }, { indent: '+1' }],
              [{ direction: 'rtl' }],
              [{ size: ['small', false, 'large', 'huge'] }],
              [{ header: [2, 3, 4, 5, 6, false] }],
              [{ font: [] }],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              ['clean'],
              this.isMedia ? ['link', 'image', 'video'] : ['link']
            ],
            handlers: {
              image: () => {
                document.getElementById(`getFile${this.name}`).click()
              }
            }
          }
        }
      },
      errorMessage: null
    }
  },
  computed: {
    editor () {
      return this.$refs[`myQuillEditor${this.name}`].quill
    }
  },
  watch: {
    content (newVal, oldVal) {
      if (newVal && newVal !== oldVal) {
        if (newVal !== this.contentValue) {
          this.contentValue = newVal
          this.editor.setContents(this.editor.clipboard.convert(newVal))
        } else {
          this.contentValue = newVal
        }
      } else if (!newVal) {
        this.editor.setContents('<p></p>')
        this.editor.setText('')
      }
    }
  },
  mounted () {
    this.disabled = false
  },
  created () {
    this.disabled = true
    this.upImage && this.editorOption.modules.toolbar.container.push(['image'])
  },
  methods: {
    onEditorChange ({ quill, html, text }) {
      if (html !== null || html !== undefined) { this.contentValue = html }
      this.$emit('input', this.contentValue)
    },
    async uploadFunction (e) {
      if (e.target.files[0]) {
        this.loading = true
        const formData = new FormData()
        formData.append('image', e.target.files[0])

        try {
          const image = await this.$axios.post('text_editor/upload_image', formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
          const { path } = image.data.data
          const range = this.$refs[`myQuillEditor${this.name}`].quill.getSelection()
          this.$refs[`myQuillEditor${this.name}`].quill.insertEmbed(range.index, 'image', path)
          this.loading = false
        } catch (error) {
          this.loading = false
          this.errorMessage = 'เกิดข้อผิดพลาด ไม่สามารถอัพโหลดรูปภาพได้'
          setTimeout(() => {
            this.errorMessage = null
          }, 3000)
        }
      }
    }
  }
}
</script>

<style>
  @import 'quill/dist/quill.snow.css';
  @import 'quill/dist/quill.bubble.css';
  @import 'quill/dist/quill.core.css';

  .quill-editor {
    border: none;
    height: auto;
  }
  .ql-container {
    min-height: 340px;
    font-size: 16px;
    color: black;
    font-family: 'Sarabun-Light';
    overflow-y: auto;
  }
  .ql-editor {
    height: 100%;
    min-height: 400px;
    overflow-y: auto;
    resize: vertical;
    white-space: normal;
    font-family: 'Prompt-Light';
  }
</style>
