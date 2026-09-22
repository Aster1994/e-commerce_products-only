import {useProductFiltersStore} from '~/stores/productFilters.ts'
import {useProducts} from "~/composables/product/useProducts.ts";

export const PRODUCTS_PAGE_SIZE = 18

export function useProductCatalog() {
    const store = useProductFiltersStore()
    const {data: products, status, error, refresh} = useProducts()

    /** from the already-fetched list */
    const categoryCounts = computed(() => {
        const counts = new Map<string, number>()
        for (const product of products.value ?? []) {
            counts.set(product.category, (counts.get(product.category) ?? 0) + 1)
        }
        return counts
    })

    const filteredProducts = computed(() => {
        let list = products.value ?? []

        if (store.search) {
            const term = store.search.toLowerCase()
            list = list.filter((product) => product.title.toLowerCase().includes(term))
        }

        if (store.categories.length) {
            list = list.filter((product) => store.categories.includes(product.category))
        }

        if (store.sort) {
            const sort = store.sort
            list = [...list].sort((a, b) => {
                switch (sort) {
                    case 'count-asc':
                        return a.rating.count - b.rating.count
                    case 'count-desc':
                        return b.rating.count - a.rating.count
                    case 'rating-asc':
                        return a.rating.rate - b.rating.rate
                    case 'rating-desc':
                        return b.rating.rate - a.rating.rate
                }
            })
        }

        return list
    })

    const totalPages = computed(() =>
        Math.max(1, Math.ceil(filteredProducts.value.length / PRODUCTS_PAGE_SIZE)),
    )

    // snap back to the last valid page
    watch(totalPages, (max) => {
        if (store.page > max) store.setPage(max)
    })

    const paginatedProducts = computed(() => {
        const start = (store.page - 1) * PRODUCTS_PAGE_SIZE
        return filteredProducts.value.slice(start, start + PRODUCTS_PAGE_SIZE)
    })

    const isEmpty = computed(() => status.value === 'success' && filteredProducts.value.length === 0)

    return {
        status,
        error,
        refresh,
        categoryCounts,
        paginatedProducts,
        totalItems: computed(() => filteredProducts.value.length),
        totalPages,
        isEmpty,
        pageSize: PRODUCTS_PAGE_SIZE,
    }
}