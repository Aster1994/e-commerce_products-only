<script setup lang="ts">
interface Props {
  size?: 'sm' | 'md' | 'lg'
}

withDefaults(defineProps<Props>(), { size: 'md' })

const sizeClass: Record<string, string> = {
  sm: 'h-4 w-4 border-2',
  md: 'h-6 w-6 border-2',
  lg: 'h-10 w-10 border-[3px]',
}
</script>

<template>
  <span
    class="inline-block animate-spin rounded-full border-current border-t-transparent"
    :class="sizeClass[size]"
    role="status"
    aria-label="در حال بارگذاری"
  />
</template>
