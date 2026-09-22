<template>
    <BaseCard v-if="status === 'pending'" class="grid grid-cols-1 sm:grid-cols-[172px_1fr] my-6 items-center gap-3">
        <BaseSkeleton class="col-span-2 w-full h-[310px]" rounded="lg"/>
        <div v-for="i in 4" :key="i"
             class="flex flex-col gap-3">
            <BaseSkeleton class="h-12"/>
            <BaseSkeleton class="h-12"/>
        </div>
    </BaseCard>

    <div v-else-if="status === 'success' && product" class="mx-auto max-w-max-width-container py-6">
        <Breadcrumb
            :items="[
        { label: categoryLabel || 'لیست محصولات', to: `/products?category=${product.category}` },
        { label: product.title },
      ]"
            class="pb-6"
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

                <div v-for="(row, i) in tableData" :key="i"
                     class="grid grid-cols-1 sm:grid-cols-[172px_1fr] items-center gap-3">
                    <div
                        class="p-[13px] min-h-12 h-full text-sm font-medium text-gray-600 bg-gray-25 rounded-2xl sm:rounded-l-sm sm:rounded-r-2xl">
                        {{ row.title }}
                    </div>
                    <component :is="row.tag"
                               class="p-[13px] min-h-12 h-full text-sm font-bold text-gray-800 bg-gray-25 rounded-2xl sm:rounded-r-sm sm:rounded-l-2xl">
                        {{ row.value }}
                    </component>

                </div>
            </BaseCard>

        </div>
    </div>

    <EmptyState v-else-if="status === 'success' && !product" class="my-5"/>

    <ErrorSate v-else-if="status === 'error'" @retry="refresh"/>
</template>

<script lang="ts" setup>
import {useProduct} from '~/composables/product/useProduct'
import {getCategoryLabel} from '~/constants/product'
import Breadcrumb from "~/components/layout/Breadcrumb.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
import {commaSeparator} from "~/utils/formatNumer.ts";
import EmptyState from "~/components/ui/EmptyState.vue";
import ErrorSate from "~/components/ui/ErrorSate.vue";
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";

const route = useRoute()
const {data: product, status, error, refresh} =
    await useProduct(() => route.params.id as string)
const categoryLabel = computed(() => {
    if (!product.value) return ""
    return getCategoryLabel(product.value!.category)
})


const tableData = [
    {
        title: 'قیمت',
        value: `${commaSeparator(product.value?.price?.toFixed(2))} تومان `,
        tag: 'span'
    },
    {
        title: 'توضیحات',
        value: product.value?.description,
        tag: 'p'
    },
    {
        title: 'دسته بندی',
        value: categoryLabel.value,
        tag: 'h2'
    },
    {
        title: 'رتبه',
        value: product.value?.rating?.rate,
        tag: 'span'
    },
    {
        title: 'تعداد',
        value: product.value?.rating?.count,
        tag: 'span'
    },

]

const siteUrl = useSiteConfig().url
const productTitle = computed(() => product.value?.title ?? 'محصول پیدا نشد')
const productDescription = computed(() =>
    product.value?.description ?? 'جزئیات محصول مورد نظر در دسترس نیست.',
)

useSeoMeta({
    title: productTitle,
    description: productDescription,
    ogTitle: productTitle,
    ogDescription: productDescription,
    ogImage: computed(() => product.value?.image),
    robots: computed(() => product.value ? 'index, follow' : 'noindex, follow'),
})

useHead({
    link: [{
        rel: 'canonical',
        href: computed(() => `${siteUrl}/products/${route.params.id}`),
    }],
})

</script>