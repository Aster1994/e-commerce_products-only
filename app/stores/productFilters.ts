import {defineStore} from 'pinia'
import type {LocationQueryRaw} from 'vue-router'
import type {SortOption} from "~/types/product/product.ts";

export const useProductFiltersStore = defineStore('productFilters', () => {
    const search = ref('')
    const categories = ref<string[]>([])
    const sort = ref<SortOption | null>(null)
    const page = ref(1)

    const activeFilterCount = computed(
        () => (search.value ? 1 : 0) + categories.value.length + (sort.value ? 1 : 0),
    )

    function hydrateFromQuery(query: LocationQueryRaw) {
        search.value = typeof query.q === 'string' ? query.q : ''
        categories.value =
            typeof query.category === 'string' ? query.category.split(',').filter(Boolean) : []
        sort.value = (query.sort as SortOption) || null
        page.value = query.page ? Number(query.page) || 1 : 1
    }

    // Mirrors current state back into a route-query-shaped object.
    function toQuery(): Record<string, string> {
        const query: Record<string, string> = {}
        if (search.value) query.q = search.value
        if (categories.value.length) query.category = categories.value.join(',')
        if (sort.value) query.sort = sort.value
        if (page.value > 1) query.page = String(page.value)
        return query
    }

    function setSearch(value: string) {
        search.value = value.trim()
        page.value = 1
    }

    function setCategories(value: string[]) {
        categories.value = value
        page.value = 1
    }

    function removeCategory(category: string) {
        categories.value = categories.value.filter((item) => item !== category)
        page.value = 1
    }

    function setSort(value: SortOption | null) {
        sort.value = value
        page.value = 1
    }

    function setPage(value: number) {
        page.value = value
    }

    function reset() {
        search.value = ''
        categories.value = []
        sort.value = null
        page.value = 1
    }

    return {
        search,
        categories,
        sort,
        page,
        activeFilterCount,
        hydrateFromQuery,
        toQuery,
        setSearch,
        setCategories,
        removeCategory,
        setSort,
        setPage,
        reset,
    }
})