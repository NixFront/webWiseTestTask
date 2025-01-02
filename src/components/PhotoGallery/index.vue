<script setup lang="ts">
import { PhotoGallery } from '@/modules/PhotoGallery'

import { computed, onMounted, ref, toRef, type Ref } from 'vue'
import PhotoGalleryItem from './PhotoGalleryItem.vue'
import PhotoGalleryItemControl from './PhotoGalleryItemControl.vue'
import singletonModalConfirm from '@/modules/ModalConfirm'
import singleTonNotification from '@/modules/Notification'

const photoGallery = new PhotoGallery()

const gallery = computed(() => photoGallery.getGallery())

const refreshImageByIndex = async (index: number) => {
  let saveIndex = index
  saveIndex++
  await singletonModalConfirm
    .confirm(`обновить фото под номером ${saveIndex}?`)
    .then(async () => {
      await photoGallery.refreshPhotoItemByIndex(index)
      singleTonNotification.showNotification({
        type: 'success',
        message: `фото под номером ${saveIndex} успешно обновлено!`,
      })
    })
    .catch((error) => {
      singleTonNotification.showNotification({
        type: 'cancel',
        message: `обновление фото под номером ${saveIndex} остановлено`,
      })
    })
}

const refreshAllGallery = async () => {
  await singletonModalConfirm
    .confirm('Обновить все фото?')
    .then(async () => {
      await photoGallery.refreshAllGalery()
      singleTonNotification.showNotification({
        type: 'success',
        message: 'Фото успешно обновлены!',
      })
    })
    .catch(() => {
      singleTonNotification.showNotification({
        type: 'cancel',
        message: 'Отменено обновление фото!',
      })
    })
}

const addPhotoGallery = async () => {
  await singletonModalConfirm
    .confirm('Добавить новый элемент в спискок?')
    .then(async () => {
      await photoGallery.addNewPhoto()
      singleTonNotification.showNotification({
        type: 'success',
        message: 'Фото успешно добавлено!',
      })
    })
    .catch(() => {
      singleTonNotification.showNotification({
        type: 'cancel',
        message: 'Добавление фото остановлено',
      })
    })
}

onMounted(async () => {
  await photoGallery.fetchPhotoGallery()
})
</script>

<template>
  <div class="container">
    <div v-if="!gallery.length">loading...</div>
    <div class="photo_gallery" v-else>
      <TransitionGroup
        v-for="(item, index) of gallery"
        tag="div"
        :key="`${item.id}-${index}`"
        class="photo_gallery__wrapper"
      >
        <PhotoGalleryItem :data="item" :key="`${item.id}-${index}-element`" />
        <PhotoGalleryItemControl
          :index="index"
          :key="`${item.id}-${index}-control`"
          class="photo_gallery__item--control"
          @click:refresh="refreshImageByIndex"
        />
      </TransitionGroup>
    </div>
    <div class="btns">
      <button class="button button-default" @click="addPhotoGallery">Добавить фото</button>
      <button class="button button-second" @click="refreshAllGallery">Обновить все фото</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.btns {
  display: flex;
  gap: 12px;
  margin-top: 24px;
  @media screen and (max-width: 350px) {
    flex-direction: column;
  }
}
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0px 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.photo_gallery {
  display: grid;
  gap: 12px;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-auto-columns: 200px;
  &__wrapper {
    position: relative;
    width: 100%;
    max-width: 200px;
    height: 200px;
  }
  &__item {
    &--control {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 0;
      transition: 0.3s;
      overflow: hidden;
    }
  }
  &__wrapper:hover {
    .photo_gallery__item--control {
      height: 100%;
    }
  }
  @media screen and (max-width: 700px) {
    grid-template-columns: repeat(2, minmax(200px, 1fr));
  }
  @media screen and (max-width: 460px) {
    grid-template-columns: repeat(1, minmax(200px, 1fr));
  }
}
</style>
