<script lang="ts" setup>
import type {Product} from '~/types/product/product.ts'
import BaseBtn from "~/components/ui/BaseBtn.vue";

defineProps<{ product: Product }>()
</script>

<template>
    <article
        class="flex p-2 pb-3 h-full flex-col gap-3 rounded-3xl bg-gray-0 shadow-[0px_10px_40px_0px_#0000000D] border border-gray-50">
        <NuxtLink :to="`/products/${product.id}`" aria-hidden="true" class="block" tabindex="-1">
            <NuxtImg
                :alt="product.title"
                :src="product.image"
                class="aspect-square w-full rounded-2xl bg-gray-25 object-contain p-4"
                format="webp"
                height="400"
                loading="lazy"
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 33vw, 50vw"
                width="400"
            />
        </NuxtLink>

        <h3 class="line-clamp-2 flex-1 text-sm font-bold text-blue-900">
            <NuxtLink :to="`/products/${product.id}`" class="transition-colors hover:text-primary">
                {{ product.title }}
            </NuxtLink>
        </h3>

        <BaseBtn
            :to="`/products/${product.id}`"
            append-icon="fig:chevron-left"
            class="!border-[1.5px] !border-gray-50"
            variant="outline"
        >
            مشاهده جزیات
        </BaseBtn>
    </article>
</template>