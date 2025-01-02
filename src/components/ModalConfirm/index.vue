<script lang="ts" setup>
import singletonModalConfirm from '@/modules/ModalConfirm'
import { computed } from 'vue'

const isShow = computed(() => singletonModalConfirm.getIsShow())
const message = computed(() => singletonModalConfirm.getMessage())

const confirmModal = () => {
  singletonModalConfirm.changeIsAccept(true)
}

const cancelModal = () => {
  singletonModalConfirm.changeIsAccept(false)
}
</script>

<template>
  <div class="modal" v-if="isShow">
    <div class="modal__overlay"></div>
    <div class="modal__content">
      <div class="modal__content--content">
        <div class="modal__content--header">Вы уверены?</div>
        <div class="modal__content--body">
          <p>
            {{ message }}
          </p>
        </div>
        <div class="modal__content--footer">
          <button class="button button-second" @click="confirmModal">Подтвердить</button>
          <button class="button button-default" @click="cancelModal">Отменить</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 900;
  &__overlay {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(#000, 0.6);
    z-index: 899;
  }
  &__content {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    max-width: 400px;
    background: #fff;
    border-radius: 5px;
    z-index: 900;
    &--header {
      font-size: 24px;
      font-weight: bold;
    }
    &--body {
      font-size: 18px;
      font-weight: 500;
    }
    &--header,
    &--body,
    &--footer {
      padding: 12px 24px;
    }
    &--header,
    &--body {
      border-bottom: 1px solid rgba(#000, 0.5);
    }
    &--footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 12px;
    }
  }
  @media screen and (max-width: 460px) {
    &__content {
      max-width: 80%;
    }
  }
}
</style>
