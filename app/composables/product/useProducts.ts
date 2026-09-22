import type {Product} from '~/types/product/product.ts'

export function useProducts() {
    const {$api} = useNuxtApp()

    return useFetch<Product[]>('/products', {
        key: 'products-all',
        $fetch: $api,
    })
}