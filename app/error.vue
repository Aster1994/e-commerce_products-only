<template>
    <div
        dir="rtl"
        lang="fa"
        class="flex min-h-screen flex-col items-center justify-center gap-4 bg-gray-25 px-4 text-center"
    >
    <span class="text-primary" aria-hidden="true">
      <Icon name="app:alert-triangle" class="h-16 w-16"/>
    </span>

        <p class="text-6xl font-bold text-gray-900">{{ statusCode }}</p>
        <h1 class="text-lg font-bold text-gray-800">{{ content.title }}</h1>
        <p class="max-w-sm text-sm text-gray-600">{{ content.description }}</p>

        <div class="flex gap-3 pt-2">
            <BaseBtn @click="goHome">بازگشت به صفحه اصلی</BaseBtn>
            <BaseBtn v-if="!isNotFound" variant="outline" rounded="sm" @click="retry">
                تلاش مجدد
            </BaseBtn>
        </div>
    </div>
</template>

<script setup lang="ts">
import type {NuxtError} from '#app'
import BaseBtn from "~/components/ui/BaseBtn.vue";

const props = defineProps<{ error: NuxtError }>()

const statusCode = computed(() => props.error?.statusCode ?? 500)
const isNotFound = computed(() => statusCode.value === 404)

const content = computed(() =>
    isNotFound.value
        ? {
            title: 'صفحه مورد نظر پیدا نشد',
            description: 'آدرسی که وارد کرده‌اید وجود ندارد یا جابه‌جا شده است.',
        }
        : {
            title: 'مشکلی پیش آمد',
            description: 'خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید یا به صفحه اصلی بازگردید.',
        },
)

useSeoMeta({
    title: content.value.title,
    robots: 'noindex, nofollow',
})

function goHome() {
    clearError({redirect: '/'})
}

function retry() {
    clearError()
}
</script>
