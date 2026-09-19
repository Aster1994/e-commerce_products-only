<template>
    <div>
        <div
            v-if="status === 'pending'"
            aria-label="در حال بارگذاری محصولات"
            class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6"
            role="status"
        >
            <ProductCardSkeleton v-for="n in 9" :key="n"/>
        </div>

        <ErrorSate
            v-else-if="status === 'error'"
            description="در دریافت لیست محصولات خطایی رخ داد. لطفاً دوباره تلاش کنید."
            @retry="onRetry"
        />

        <EmptyState
            v-else-if="isEmpty"
            description="فیلترها یا عبارت جستجو را تغییر دهید."
            title="محصولی با این فیلترها پیدا نشد"
        />

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-6">
            <ProductCard v-for="product in products" :key="product.id" :product="product"/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type {Product} from '~/types/product/product.ts'
import type {AsyncDataRequestStatus} from '#app'
import ErrorSate from "~/components/ui/ErrorSate.vue";
import ProductCardSkeleton from "~/components/pages/Product/ProductCardSkeleton.vue";
import EmptyState from "~/components/ui/EmptyState.vue";
import ProductCard from "~/components/pages/Product/ProductCard.vue";

const props = defineProps<{
    products: Product[]
    status: AsyncDataRequestStatus
    isEmpty: boolean
    onRetry: () => void
}>()
</script>

