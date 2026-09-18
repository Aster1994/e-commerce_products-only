<script setup lang="ts">
interface Props {
    title?: string
    description?: string
}

withDefaults(defineProps<Props>(), {
    title: 'موردی یافت نشد.',
    description: 'لطفا دوباره امتحان کنید.',
})
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-3 py-16 text-center">

        <h3 class="text-base font-bold text-gray-800">{{ title }}</h3>
        <p class="max-w-xs text-sm text-gray-600">{{ description }}</p>

        <div v-if="$slots.action" class="pt-2">
            <slot name="action"/>
        </div>
    </div>
</template>