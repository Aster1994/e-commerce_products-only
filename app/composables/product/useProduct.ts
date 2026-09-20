import type {Product} from '~/types/product/product.ts'

// Note: FakeStoreAPI returns HTTP 200 with a `null` body for an id that doesn't exist

export function useProduct(id: MaybeRefOrGetter<string | number>) {
    const {$api} = useNuxtApp()

    return useFetch<Product | null>(() => `/products/${toValue(id)}`, {
        key: () => `product-${toValue(id)}`,
        $fetch: $api,
    })
}