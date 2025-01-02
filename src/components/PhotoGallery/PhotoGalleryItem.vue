<script lang="ts" setup>
import { PhotoGallery } from '@/modules/PhotoGallery'
import type { PhotoItem } from '@/types/photoGallery'
import { onMounted, ref, type PropType } from 'vue'

const { data } = defineProps({
  data: {
    type: Object as PropType<PhotoItem>,
    required: true,
  },
})
const isLoaded = ref(false)
</script>

<template>
  <div class="photo_gallery__item">
    <div class="photo_gallery--image">
      <img
        @load="isLoaded = true"
        lazy
        :class="{ loaded: isLoaded }"
        :src="data.url"
        :alt="`image-${data.id}`"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.photo_gallery {
  &--image {
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 5px;
    img {
      display: block;
      width: 100%;
      height: 100%;
      filter: blur(20px);
      &.loaded {
        filter: none;
      }
    }
  }
}
</style>
