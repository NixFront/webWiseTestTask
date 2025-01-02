import useFetch from '@/composables/useCustomFetch'
import type { PhotoItem } from '@/types/photoGallery'
import { reactive } from 'vue'

export class PhotoGallery {
  private _gallery = reactive<PhotoItem[]>([])

  async fetchPhotoGallery(): Promise<void> {
    await useFetch('/data?limit=10')
      .then(({ data }) => {
        this._gallery.splice(0, this._gallery.length, ...(data as PhotoItem[]))
      })
      .catch((error) => console.log('error in fetch ', error))
  }
  getGallery(): Array<PhotoItem> {
    return this._gallery
  }
  async refreshPhotoItemByIndex(index: number): Promise<void> {
    await useFetch('/data?limit=1')
      .then(({ data }) => {
        this._gallery[index] = data[0] as PhotoItem
      })
      .catch((error) => console.log('error in refresh photo by index ', error))
  }
  async addNewPhoto(): Promise<boolean> {
    return await useFetch('/data?limit=1')
      .then(({ data }) => {
        this._gallery.push(data[0] as PhotoItem)
        return true
      })
      .catch((error) => {
        console.error('error in add new photo', error)
        return false
      })
  }
  async refreshAllGalery(): Promise<boolean> {
    return await useFetch(`data?limit=${this._gallery.length}`)
      .then(({ data }) => {
        this._gallery.splice(0, this._gallery.length, ...(data as PhotoItem[]))
        return true
      })
      .catch((error) => {
        console.error('error in refresh all gallery ', error)
        return false
      })
  }
}
