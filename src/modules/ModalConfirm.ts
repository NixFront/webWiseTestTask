import { ref, watch, type Ref } from 'vue'

class ModalConfirm {
  private _isShow: Ref<boolean> = ref(false)
  private _message: Ref<string> = ref('')
  private isAccept: Ref<boolean | null> = ref(null)
  private instance: ModalConfirm | null = null
  constructor() {
    if (!this.instance) this.instance = this
  }
  async confirm(message: string = ''): Promise<boolean> {
    this._isShow.value = true
    this._message.value = message
    return new Promise((resolve, reject) => {
      const stopWatching = watch(this.isAccept, (newValue) => {
        if (newValue === true) {
          this._isShow.value = false
          stopWatching() // Останавливаем слежение
          resolve(true)
          this.changeIsAccept(null)
        } else if (newValue === false) {
          this._isShow.value = false
          stopWatching() // Останавливаем слежение
          reject()
          this.changeIsAccept(null)
        }
      })
    })
  }
  changeIsAccept(value: boolean | null) {
    this.isAccept.value = value
  }

  getIsShow(): boolean {
    return this._isShow.value
  }
  getMessage(): string {
    return this._message.value
  }
}

const singletonModalConfirm = Object.freeze(new ModalConfirm())
export default singletonModalConfirm
