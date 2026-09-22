import type {Product} from '~/types/product/product'

export default defineSitemapEventHandler(async () => {
    const config = useRuntimeConfig()
    const products = await $fetch<Product[]>(
        `${config.public.apiBaseUrl}/products`,
        {timeout: 10_000},
    )

    return products.map((product) => ({
        loc: `/products/${product.id}`,
        changefreq: 'weekly' as const,
        priority: 0.8,
    }))
})
