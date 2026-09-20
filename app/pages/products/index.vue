<template>
    <div class="max-w-max-width-container py-6">
        
        <div class="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">

            <aside class="order-1 lg:order-1">
                <ProductFilters :category-counts="categoryCounts"/>
            </aside>

            <div class="order-2 flex flex-col gap-6 lg:order-2">
                <AppliedFilters/>

                <ProductGrid
                    :is-empty="isEmpty"
                    :on-retry="refresh"
                    :products="paginatedProducts"
                    :status="status"
                />

                <BasePagination v-model="store.page" :total-pages="totalPages"/>
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useSyncFiltersWithRoute} from '~/composables/product/useSyncFiltersWithRoute.ts'
import {useProductCatalog} from '~/composables/product/useProductCatalog.ts'
import AppliedFilters from "~/components/pages/Product/AppliedFilters.vue";
import ProductGrid from "~/components/pages/Product/ProductGrid.vue";
import BasePagination from "~/components/ui/BasePagination.vue";
import ProductFilters from "~/components/pages/Product/ProductFilters.vue";

const store = useSyncFiltersWithRoute()
const {status, error, refresh, categoryCounts, paginatedProducts, totalPages, isEmpty} =
    useProductCatalog()

useSeoMeta({
    title: 'لیست محصولات',
    description: 'محصولات ما را مرور، جستجو و بر اساس دسته‌بندی و امتیاز فیلتر کنید.',
    ogTitle: 'لیست محصولات',
    ogDescription: 'محصولات ما را مرور، جستجو و بر اساس دسته‌بندی و امتیاز فیلتر کنید.',
})
</script>

