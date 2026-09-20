<template>
    <div class="mx-auto max-w-6xl px-4 py-6">
        <Breadcrumb
            :items="[
        { label: categoryLabel, to: `/products?category=${product.category}` },
        { label: product.title },
      ]"
            class="py-6"
        />

        <div class="flex flex-col gap-6">
            <BaseCard as="section" class="flex flex-col gap-6" padding="lg">
                <h1 class="text-2xl font-bold text-blue-900">{{ product.title }}</h1>

                <NuxtImg
                    :alt="product.title"
                    :src="product.image"
                    class="w-auto max-w-full h-auto max-h-[310px] object-contain"
                    fetchpriority="high"
                    format="webp"
                    height="500"
                    loading="eager"
                    width="500"
                />
            </BaseCard>


            <BaseCard as="section" class="flex flex-col gap-4" padding="lg">

                <span class="text-xl font-bold text-blue-900">مشخصات فنی</span>

                <div v-for="(row, i) in tableData" :key="i" class="grid grid-cols-[172px_1fr] items-center gap-3">
                    <div
                        class="p-[13px] h-full text-sm font-medium text-gray-600 bg-gray-25 rounded-l-sm rounded-r-2xl">
                        {{ row.title }}
                    </div>
                    <div
                        class="p-[13px] h-full text-sm font-bold text-gray-800 bg-gray-25 rounded-r-sm rounded-l-2xl">
                        {{ row.value }}
                    </div>

                </div>
            </BaseCard>

        </div>
    </div>
</template>

<script lang="ts" setup>
import {useProduct} from '~/composables/product/useProduct'
import {getCategoryLabel} from '~/constants/product'
import Breadcrumb from "~/components/layout/Breadcrumb.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import {commaSeparator} from "~/utils/formatNumer.ts";

const route = useRoute()
const {data: product, error} = await useProduct(() => route.params.id as string)

const categoryLabel = computed(() => getCategoryLabel(product.value!.category))


const tableData = [
    {
        title: 'قیمت',
        value: `${commaSeparator(product.value?.price?.toFixed(2))} تومان `,
    },
    {
        title: 'توضیحات',
        value: product.value?.description,
    },
    {
        title: 'دسته بندی',
        value: categoryLabel.value,
    },
    {
        title: 'رتبه',
        value: product.value?.rating?.rate,
    },
    {
        title: 'تعداد',
        value: product.value?.rating?.count,
    },

]

if (!product.value) {
    throw createError({statusCode: 404, statusMessage: 'محصول یافت نشد', fatal: true})
}

useSeoMeta({
    title: product.value.title,
    description: product.value.description,
    ogTitle: product.value.title,
    ogDescription: product.value.description,
    ogImage: product.value.image,
})

</script>