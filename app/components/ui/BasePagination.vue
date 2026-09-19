<template>
    <nav v-if="totalPages > 1" aria-label="صفحه‌بندی" class="flex items-center justify-center gap-2">
        <button
            :disabled="modelValue === 1"
            aria-label="صفحه قبل"
            class="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-gray-50 text-gray-600 transition-colors hover:bg-gray-25 disabled:opacity-40"
            type="button"
            @click="go(modelValue - 1)"
        >
            <Icon class="h-4 w-4 rotate-180" name="fig:chevron-left"/>
        </button>

        <button
            v-for="page in pages"
            :key="page"
            :aria-current="page === modelValue ? 'page' : undefined"
            :class="page === modelValue ? 'bg-primary text-gray-0' : 'text-gray-700 hover:bg-gray-50'"
            class="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors"
            type="button"
            @click="go(page)"
        >
            {{ page }}
        </button>

        <button
            :disabled="modelValue === totalPages"
            aria-label="صفحه بعد"
            class="cursor-pointer flex h-9 w-9 items-center justify-center rounded-lg border border-gray-50 text-gray-600 transition-colors hover:bg-gray-25 disabled:opacity-40"
            type="button"
            @click="go(modelValue + 1)"
        >
            <Icon class="h-4 w-4" name="fig:chevron-left"/>
        </button>
    </nav>
</template>

<script lang="ts" setup>
interface Props {
    modelValue: number
    totalPages: number
}

const props = defineProps<Props>()
const emit = defineEmits<{ 'update:modelValue': [value: number] }>()

const pages = computed(() => Array.from({length: props.totalPages}, (_, i) => i + 1))

function go(page: number) {
    if (page < 1 || page > props.totalPages || page === props.modelValue) return
    emit('update:modelValue', page)
}
</script>

