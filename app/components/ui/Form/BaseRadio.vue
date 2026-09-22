<template>
    <label
        :for="id"
        class="inline-flex select-none items-center gap-2"
        :class="disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'"
    >
        <input
            :id="id"
            type="radio"
            class="sr-only"
            :name="name"
            :checked="isChecked"
            :disabled="disabled"
            @change="emit('update:modelValue', value)"
        />

        <span
            class="flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-[1.5px] transition-colors"
            :class="isChecked ? 'border-primary' : 'border-gray-200'"
            aria-hidden="true"
        >
      <span v-if="isChecked" class="h-2 w-2 rounded-full bg-primary"/>
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
    modelValue?: unknown
    value: unknown
    name?: string
    disabled?: boolean
    id?: string
}

const props = withDefaults(defineProps<Props>(), {
    modelValue: undefined,
    disabled: false,
    id: undefined,
    name: undefined,
})

const emit = defineEmits<{ 'update:modelValue': [value: unknown] }>()

const isChecked = computed(() => props.modelValue === props.value)
</script>
