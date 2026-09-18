<template>
    <div
        class="base-chip inline-flex h-8 items-center gap-2.5 rounded-full bg-primary/20 p-2 text-xs font-medium leading-4 text-blue-900"
    >
        <Icon v-if="prependIcon" :name="prependIcon" class="shrink-0" :size="16"/>

        <span class="text-right"><slot/></span>

        <button
            v-if="removable"
            type="button"
            :disabled="disabled"
            class="shrink-0 text-gray-600 transition-colors hover:text-primary disabled:opacity-40 flex items-center"
            aria-label="حذف"
            @click="emit('remove')"
        >
            <Icon name="fig:close-fill" :size="16"/>
        </button>
    </div>
</template>

<script setup lang="ts">
interface Props {
    removable?: boolean
    disabled?: boolean
    prependIcon?: string
}

withDefaults(defineProps<Props>(), {
    removable: false,
    disabled: false,
    prependIcon: ''
})

const emit = defineEmits<{ remove: [] }>()
</script>
