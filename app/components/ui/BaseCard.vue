<script setup lang="ts">
interface Props {
    padding?: 'sm' | 'lg' // 16px / 24px
    as?: string
}

withDefaults(defineProps<Props>(), {
    padding: 'lg',
    as: 'div',
})
</script>

<template>
    <component :is="as" class="rounded-3xl bg-gray-0 shadow-card" :class="padding === 'sm' ? 'p-4' : 'p-6'">
        <slot/>
    </component>
</template>