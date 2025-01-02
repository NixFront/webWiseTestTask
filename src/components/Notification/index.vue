<script lang="ts" setup>
import singleTonNotification from '@/modules/Notification'
import SuccessIcon from '@/assets/svg/success.svg'
import ErrorIcon from '@/assets/svg/error.svg'
import { computed } from 'vue'

const isShow = computed(() => singleTonNotification.getIsShow())
const message = computed(() => singleTonNotification.getMessage())
const type = computed(() => singleTonNotification.getType())
</script>

<template>
  <Transition>
    <div class="notification" v-if="isShow">
      <div class="notification__icon" :class="`notification__icon--${type}`">
        <SuccessIcon v-if="type == 'success'" />
        <ErrorIcon v-if="type == 'error' || type == 'cancel'" />
      </div>
      <div class="notification__text">{{ message }}</div>
    </div>
  </Transition>
</template>

<style lang="scss" scoped>
.notification {
  background-color: #fff;
  border-radius: 5px;
  padding: 10px 20px;
  box-shadow: 12px 12px 20px 6px #e1e0e0;
  width: 100%;
  max-width: 400px;
  position: fixed;
  right: 24px;
  top: 24px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  &__icon {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      width: 24px;
      height: 24px;
    }
  }
  &__text {
    font-size: 18px;
    font-weight: 500;
  }
  @media screen and (max-width: 475px) {
    max-width: 80%;
    right: 0;
    left: 50%;
    transform: translate(-50%, 24px);
  }
}
</style>
