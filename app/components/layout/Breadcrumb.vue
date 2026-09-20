<template>
    <nav
        aria-label="مسیر صفحه"
        class="w-full"
        dir="rtl"
    >
        <ol
            class="flex items-center gap-4 text-sm font-bold text-gray-500"
        >
            <!-- Home -->
            <li class="flex shrink-0 items-center">
                <NuxtLink
                    aria-label="صفحه اصلی"
                    class="flex items-center transition-opacity hover:opacity-70"
                    to="/"
                >
                    <Icon
                        aria-hidden="true"
                        class="size-7"
                        name="fig:home"
                    />
                </NuxtLink>
            </li>

            <!-- Breadcrumb items -->
            <template
                v-for="(item, index) in items"
                :key="`${item.label}-${index}`"
            >
                <!-- Separator -->
                <li
                    aria-hidden="true"
                    class="flex shrink-0 items-center"
                >
                    <Icon
                        class="size-5"
                        name="fig:chevron-left"
                    />
                </li>

                <!-- Item -->
                <li
                    :aria-current="index === items.length - 1 ? 'page' : undefined"
                    class="flex min-w-0 items-center"
                >
                    <NuxtLink
                        v-if="item.to && index !== items.length - 1"
                        :to="item.to"
                        class="truncate transition-opacity hover:opacity-70"
                    >
                        {{ item.label }}
                    </NuxtLink>

                    <span
                        v-else
                        class="truncate"
                    >
                        {{ item.label }}
                    </span>
                </li>
            </template>
        </ol>
    </nav>
</template>

<script lang="ts" setup>
export interface BreadcrumbItem {
    label: string
    to?: string
}

interface Props {
    items: BreadcrumbItem[]
}

const props = defineProps<Props>()
</script>
