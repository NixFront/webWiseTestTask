import type { PhotoGallery } from '@/modules/PhotoGallery'
import type { PhotoItem } from '@/types/photoGallery'
import { ref, type Ref } from 'vue'

export default async function useFetch(url: string, options: object = {}) {
  let data: Array<PhotoItem | []> = []
  let error: any = null
  const loading = false

  const baseUrl = import.meta.env.VITE_API_BASE_PATH

  try {
    const res = await fetch(`${baseUrl}/${url}`, { ...options })
    if (!res.ok) error.value = 'could not fetch data'
    data = await res.json()
  } catch (err: any) {
    error = err
  }

  return { data, error }
}
