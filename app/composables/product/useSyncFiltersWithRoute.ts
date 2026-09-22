import {useProductFiltersStore} from '~/stores/productFilters.ts'

export function useSyncFiltersWithRoute() {
    const route = useRoute()
    const router = useRouter()
    const store = useProductFiltersStore()

    store.hydrateFromQuery(route.query)

    watch(
        () => store.toQuery(),
        (query) => {
            const isSame = JSON.stringify(route.query) === JSON.stringify(query)
            if (isSame) return
            router.replace({query})
        },
    )

    return store
}