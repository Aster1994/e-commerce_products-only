<script setup lang="ts">
import BaseSpinner from "~/components/ui/BaseSpinner.vue";
import {NuxtLink} from '#components'

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
    href?: string, // in case of a tag
    to?: string, // in case of NuxtLink tag
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
    href: '',
    to: ''
})

const emit = defineEmits(['click'])
const slots = useSlots()
const isIconOnly = computed(
    () => !slots.default && (!!props.prependIcon || !!props.appendIcon),
)

// type/disabled are only valid on a real <button>; a disabled NuxtLink/anchor
// needs aria-disabled + pointer-events-none instead.
const rootBindings = computed(() =>
    !props.to && !props.href
        ? {type: props.type, disabled: props.disabled || props.loading}
        : {'aria-disabled': props.disabled || props.loading || undefined},
)

const roundedClass: Record<Rounded, string> = {
    sm: 'rounded-lg',
    md: 'rounded-2xl',
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

const handleClick = (e) => {
    if (!props.disabled && !props.loading) emit('click', e)
}
</script>

<template>
    <component
        :is="to ? NuxtLink : href ? 'a' : 'button'"
        v-bind="rootBindings"
        :aria-label="isIconOnly ? ariaLabel : undefined"
        :aria-busy="loading"
        :href="href"
        :to="to"
        :class="[
      'cursor-pointer inline-flex items-center justify-center gap-2 text-sm font-bold leading-4',
      'transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40',
      (disabled || loading) && (to || href) && 'pointer-events-none opacity-40',
      isIconOnly ? 'h-10 w-10 p-0' : 'h-10 px-4 py-3',
      roundedClass[rounded],
      variantClass[variant],
    ]"
        @click="handleClick"
    >
        <BaseSpinner v-if="loading" size="sm"/>

        <template v-else>
            <Icon v-if="prependIcon" :name="prependIcon" :size="16"/>
            <slot/>
            <Icon v-if="appendIcon" :name="appendIcon" :size="16"/>
        </template>

    </component>
</template>