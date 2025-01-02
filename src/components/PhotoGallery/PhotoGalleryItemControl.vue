<script setup lang="ts">
import RefreshIcon from '@/assets/svg/refresh.svg'
const emits = defineEmits(['click:refresh'])
const { index } = defineProps({
  index: {
    type: Number,
    required: true,
  },
})
</script>

<template>
  <div class="control">
    <div class="control--refresh" title="refresh image" @click="emits('click:refresh', index)">
      <RefreshIcon />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.control {
  background: rgba(#000, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  &--refresh {
    cursor: pointer;
    svg {
      &:hover {
        transform: rotate(360deg);
      }
    }
  }
  svg {
    width: 50px;
    height: 50px;
    fill: #fff;
    transition: 0.5s;
  }
}
</style>
