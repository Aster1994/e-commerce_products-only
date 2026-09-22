<template>
    <div
        class="base-input group flex h-10 items-center gap-2 rounded-2xl border border-gray-50 bg-gray-25 px-4 transition-colors focus-within:border-primary"
    >
        <Icon
            v-if="prependIcon"
            :name="prependIcon"
            class="shrink-0 text-gray-600 group-focus-within:text-primary"
            :size="16"
        />

        <span v-if="prependIcon" class="h-4 w-px shrink-0 bg-gray-50" aria-hidden="true"/>

        <input
            :id="id"
            :name="name"
            :type="type"
            :value="modelValue"
            :placeholder="placeholder"
            :disabled="disabled"
            :style="type === 'number' ? 'direction: ltr; text-align: right;' : ''"
            :inputmode="type === 'number' ? 'numeric' : 'text'"
            class="h-full w-full bg-transparent text-right text-[13px] font-medium leading-6 text-gray-900 outline-none placeholder:text-gray-500 disabled:cursor-not-allowed"
            @input="onInput"
        />
        <button
            v-if="clearable && modelValue"
            type="button"
            class="shrink-0 flex items-center justify-center"
            aria-label="پاک کردن"
            @click="onClear"
        >
            <Icon name="fig:close-fill" :size="16" style="color: #647E9A"/>
        </button>
    </div>
</template>

<script setup lang="ts">
interface Props {
    modelValue?: string
    placeholder?: string
    disabled?: boolean
    clearable?: boolean
    type?: string
    id?: string
    name?: string
    prependIcon?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: '',
    placeholder: '',
    disabled: false,
    clearable: false,
    type: 'text',
    id: undefined,
    name: undefined,
    prependIcon: ''
})

const emit = defineEmits<{
    'update:modelValue': [value: string]
    clear: []
}>()

function onInput(event: Event) {
    emit('update:modelValue', (event.target as HTMLInputElement).value)
}

function onClear() {
    emit('update:modelValue', '')
    emit('clear')
}
</script>

