<script lang="ts" setup>
import BaseCard from "~/components/ui/BaseCard.vue";

interface Props {
    title: string
    defaultOpen?: boolean
}

const props = withDefaults(defineProps<Props>(), {defaultOpen: true})
const isOpen = ref(props.defaultOpen)
</script>

<template>
    <BaseCard as="section" padding="sm">
        <button
            :aria-expanded="isOpen"
            class="flex w-full items-center justify-between text-[13px] font-medium text-gray-700"
            type="button"
            @click="isOpen = !isOpen"
        >
            {{ title }}
            <Icon
                :class="isOpen && 'rotate-180'"
                aria-hidden="true"
                class="h-4 w-4 shrink-0 text-gray-500 transition-transform duration-150"
                name="fig:chevron-down"
            />
        </button>

        <div v-show="isOpen" class="mt-4 flex flex-col gap-3">
            <slot/>
        </div>
    </BaseCard>
</template>