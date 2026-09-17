<script setup lang="ts">
import BaseSpinner from "~/components/ui/BaseSpinner.vue";

type Variant = 'solid' | 'outline' | 'ghost'
type Rounded = 'sm' | 'md' | 'full' // 8px / 16px / 100%

interface Props {
    variant?: Variant
    rounded?: Rounded
    disabled?: boolean
    loading?: boolean
    type?: 'button' | 'submit' | 'reset'
    // Required when the button has no visible text (icon-only)
    ariaLabel?: string,
    prependIcon?: string,
    appendIcon?: string,
}

const props = withDefaults(defineProps<Props>(), {
    variant: 'solid',
    rounded: 'md',
    disabled: false,
    loading: false,
    type: 'button',
    ariaLabel: undefined,
    prependIcon: '',
    appendIcon: '',
})

const slots = useSlots()
const isIconOnly = computed(
    () => !slots.default && (!!props.prependIcon || !!props.appendIcon),
)

const roundedClass: Record<Rounded, string> = {
    sm: 'rounded-lg',
    md: 'rounded-xl',
    full: 'rounded-full',
}

const variantClass: Record<Variant, string> = {
    solid:
        'bg-primary text-gray-0 border border-transparent hover:brightness-95 active:brightness-90',
    outline:
        'bg-transparent text-primary border border-primary hover:bg-primary/5 active:bg-primary/10',
    ghost:
        'bg-transparent text-primary border border-transparent hover:bg-primary/5 active:bg-primary/10',
}
</script>

<template>
    <button
        :type="type"
        :disabled="disabled || loading"
        :aria-label="isIconOnly ? ariaLabel : undefined"
        :aria-busy="loading"
        :class="[
      'base-btn h-10 px-4 py-3 inline-flex items-center justify-center gap-2 text-sm font-bold leading-4',
      'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40',
      roundedClass[rounded],
      variantClass[variant],
    ]"
    >
        <BaseSpinner v-if="loading" size="sm"/>

        <template v-else>
            <Icon v-if="prependIcon" :name="prependIcon"/>
            <slot/>
            <Icon v-if="appendIcon" :name="appendIcon"/>
        </template>
    </button>
</template>