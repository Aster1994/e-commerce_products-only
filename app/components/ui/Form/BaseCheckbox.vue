<template>
    <label
        :for="id"
        class="base-checkbox inline-flex select-none items-center gap-2"
        :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
    >
        <input
            :id="id"
            type="checkbox"
            class="sr-only"
            :checked="isChecked"
            :disabled="disabled"
            @change="toggle"
        />

        <span
            class="flex h-4 w-4 shrink-0 items-center justify-center rounded border-[1.5px] transition-colors"
            :class="isChecked ? 'border-primary bg-primary' : 'border-gray-200 bg-gray-0'"
            aria-hidden="true"
        >
      <Icon v-if="isChecked" name="fig:checked" :size="10" class="text-gray-0"/>
    </span>

        <span
            class="text-right text-xs font-medium leading-4 transition-colors"
            :class="isChecked ? 'text-gray-800' : 'text-gray-500'"
        >
      <slot/>
    </span>
    </label>
</template>

<script setup lang="ts">
interface Props {
    modelValue?: boolean | unknown[]
    value?: unknown
    disabled?: boolean
    id?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: false,
    value: undefined,
    disabled: false,
    id: undefined,
})

const emit = defineEmits<{ 'update:modelValue': [value: boolean | unknown[]] }>()

const isChecked = computed(() => {
    if (Array.isArray(props.modelValue)) {
        return props.modelValue.includes(props.value)
    }
    return !!props.modelValue
})

function toggle() {
    if (props.disabled) return

    if (Array.isArray(props.modelValue)) {
        const next = isChecked.value
            ? props.modelValue.filter((item) => item !== props.value)
            : [...props.modelValue, props.value]
        emit('update:modelValue', next)
        return
    }

    emit('update:modelValue', !props.modelValue)
}
</script>
