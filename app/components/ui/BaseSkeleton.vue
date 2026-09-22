<template>
    <span :class="roundedClass[rounded]" aria-hidden="true" class="block animate-pulse bg-gray-50"/>
</template>

<script lang="ts" setup>
interface Props {
    rounded?: 'sm' | 'md' | 'lg' | 'full'
}

withDefaults(defineProps<Props>(), {rounded: 'md'})

const roundedClass: Record<string, string> = {
    sm: 'rounded-lg', // 8px
    md: 'rounded-xl', // 12px
    lg: 'rounded-2xl', // 16px
    full: 'rounded-full',
}
</script>

