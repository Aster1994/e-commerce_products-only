<template>
    <Teleport to="body">
        <Transition name="modal-backdrop">
            <div
                v-if="isOpen"
                aria-modal="true"
                class="
                      fixed inset-0 z-9999
                      flex
                      items-center justify-center
                      p-4 sm:p-6
                    "
                role="dialog"
            >
                <!-- Backdrop -->
                <div
                    aria-hidden="true"
                    class="absolute inset-0 bg-gray-900/10 backdrop-blur-[2px]"
                    @mousedown.self="handleBackdropClick"
                />

                <Transition
                    name="modal-panel-center"
                    appear
                >
                    <div
                        v-if="isOpen"
                        :style="{
              maxWidth: props.maxWidth,
            }"
                        class="
              relative z-10
              w-full
              rounded-3xl
              bg-gray-0
              shadow-card
              overflow-hidden
            "
                        @mousedown.stop
                    >
                        <!-- Header -->
                        <div
                            v-if="$slots.header || $slots.close"
                            class="
                flex items-center justify-between
                gap-4
                px-5 py-4
                sm:px-6 sm:py-5
              "
                        >
                            <div class="min-w-0 flex-1">
                                <slot name="header"/>
                            </div>

                            <slot
                                :close="close"
                                name="close"
                            >
                                <button
                                    aria-label="بستن"
                                    class="
                    flex size-10 shrink-0 items-center justify-center
                    rounded-full
                    text-gray-500
                    transition
                    hover:bg-gray-100
                    active:scale-95
                  "
                                    type="button"
                                    @click="close"
                                >
                                    <Icon
                                        aria-hidden="true"
                                        class="size-5"
                                        name="fig:close-fill"
                                    />
                                </button>
                            </slot>
                        </div>

                        <!-- Content -->
                        <div class="px-5 pb-5 sm:px-6 sm:pb-6">
                            <slot/>
                        </div>

                        <!-- Footer -->
                        <div
                            v-if="$slots.footer"
                            class="
                border-t border-gray-100
                px-5 py-4
                sm:px-6 sm:py-5
              "
                        >
                            <slot name="footer"/>
                        </div>
                    </div>
                </Transition>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import {computed, nextTick, onBeforeUnmount, watch} from 'vue'


interface Props {
    modelValue: boolean
    closeOnBackdrop?: boolean
    closeOnEscape?: boolean
    maxWidth?: string;
}

const props = withDefaults(defineProps<Props>(), {
    closeOnBackdrop: true,
    closeOnEscape: true,
    maxWidth: '32rem',
})

const emit = defineEmits<{
    'update:modelValue': [value: boolean]
    close: []
}>()

const isOpen = computed({
    get: () => props.modelValue,
    set: (value: boolean) => {
        emit('update:modelValue', value)
    },
})

const close = () => {
    if (!isOpen.value) return

    isOpen.value = false
    emit('close')
}

const handleBackdropClick = () => {
    console.log('handleBackdropClick', props.closeOnBackdrop)
    if (!props.closeOnBackdrop) return

    close()
}

const handleKeydown = (event: KeyboardEvent) => {
    if (
        event.key === 'Escape' &&
        props.closeOnEscape &&
        isOpen.value
    ) {
        close()
    }
}

const lockBodyScroll = () => {
    if (!import.meta.client) return

    document.body.style.overflow = 'hidden'
}

const unlockBodyScroll = () => {
    if (!import.meta.client) return

    document.body.style.overflow = ''
}

watch(
    () => props.modelValue,
    async (value) => {
        if (!import.meta.client) return

        if (value) {
            lockBodyScroll()

            await nextTick()

            window.addEventListener('keydown', handleKeydown)
        } else {
            unlockBodyScroll()
            window.removeEventListener('keydown', handleKeydown)
        }
    },
    {
        immediate: true,
    },
)

onBeforeUnmount(() => {
    if (!import.meta.client) return

    unlockBodyScroll()
    window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
/* Backdrop*/

.modal-backdrop-enter-active,
.modal-backdrop-leave-active {
    transition: opacity 200ms ease;
}

.modal-backdrop-enter-from,
.modal-backdrop-leave-to {
    opacity: 0;
}


.modal-panel-center-enter-active,
.modal-panel-center-leave-active {
    transition: opacity 200ms ease,
    transform 200ms ease;
}

.modal-panel-center-enter-from,
.modal-panel-center-leave-to {
    opacity: 0;
    transform: scale(0.96) translateY(8px);
}

.modal-panel-center-enter-to,
.modal-panel-center-leave-from {
    opacity: 1;
    transform: scale(1) translateY(0);
}

</style>