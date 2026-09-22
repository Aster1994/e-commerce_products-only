<script lang="ts" setup>
// for a section that failed to load
import BaseBtn from "~/components/ui/BaseBtn.vue";

interface Props {
    title?: string
    description?: string
    retryable?: boolean
}

withDefaults(defineProps<Props>(), {
    title: 'مشکلی پیش آمد',
    description: 'در دریافت اطلاعات خطایی رخ داد. لطفاً دوباره تلاش کنید.',
    retryable: true,
})

const emit = defineEmits<{ retry: [] }>()
</script>

<template>
    <div class="flex flex-col items-center justify-center gap-3 py-16 text-center">

        <h3 class="text-base font-bold text-gray-800">{{ title }}</h3>
        <p class="max-w-xs text-sm text-gray-600">{{ description }}</p>

        <BaseBtn v-if="retryable" @click="emit('retry')"> تلاش مجدد</BaseBtn>
    </div>
</template>