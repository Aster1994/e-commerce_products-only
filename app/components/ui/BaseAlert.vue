<template>
    <div
        class="base-alert flex items-center gap-3 rounded-xl p-3 text-right text-sm"
        :class="[styles[variant].bg, styles[variant].text]"
        role="alert"
    >
        <Icon :name="styles[variant].icon" class="h-5 w-5 shrink-0" aria-hidden="true"/>

        <div class="flex-1">
            <p v-if="title" class="font-bold">{{ title }}</p>
            <p class="leading-5">
                <slot/>
            </p>
        </div>

        <button
            v-if="dismissible"
            type="button"
            class="shrink-0 opacity-70 transition-opacity hover:opacity-100 flex items-center cursor-pointer"
            aria-label="بستن"
            @click="emit('dismiss')"
        >
            <Icon name="fig:close-fill" :size="16"/>
        </button>
    </div>
</template>

<script setup lang="ts">
type Variant = 'error' | 'success' | 'warning' | 'info'

interface Props {
    variant?: Variant
    title?: string
    dismissible?: boolean
}

withDefaults(defineProps<Props>(), {
    variant: 'info',
    title: undefined,
    dismissible: true,
})

const emit = defineEmits<{ dismiss: [] }>()

const styles: Record<Variant, { bg: string; text: string; icon: string }> = {
    error: {bg: 'bg-primary/10', text: 'text-primary', icon: 'fig:alert-triangle'},
    success: {bg: 'bg-emerald-50', text: 'text-emerald-700', icon: 'fig:check-circle'},
    warning: {bg: 'bg-amber-50', text: 'text-amber-700', icon: 'fig:alert-triangle'},
    info: {bg: 'bg-blue-900/5', text: 'text-blue-900', icon: 'fig:info'},
}
</script>

