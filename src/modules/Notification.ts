import { ref, type Ref } from 'vue'

type TypeNotification = 'success' | 'error' | 'cancel'

interface IShowNotification {
  type: TypeNotification
  message: string
}

class Notification {
  private _isShow: Ref<boolean> = ref(false)
  private _message: Ref<string> = ref('')
  private _type: Ref<TypeNotification> = ref('success')
  private _instance: Notification | null = null
  private _delay: number = 1500
  private _timer: Ref<NodeJS.Timeout | null> = ref(null)
  constructor() {
    if (!this._instance) this._instance = this
  }
  private show() {
    this._isShow.value = true
  }
  private hide() {
    this._isShow.value = false
  }
  getIsShow(): boolean {
    return this._isShow.value
  }
  getMessage(): string {
    return this._message.value
  }
  getType(): TypeNotification {
    return this._type.value
  }
  showNotification({ type, message }: IShowNotification) {
    this._type.value = type
    this._message.value = message
    this.show()
    if (this._timer.value) clearTimeout(this._timer.value)
    this._timer.value = setTimeout(() => {
      this.hide()
    }, this._delay)
  }
}

const singleTonNotification = Object.freeze(new Notification())
export default singleTonNotification
