export interface ProductRating {
    rate: number
    count: number
}

export interface Product {
    id: number
    title: string
    price: number
    description: string
    category: string
    image: string
    rating: ProductRating
}

export type SortOption = 'count-asc' | 'count-desc' | 'rating-desc' | 'rating-asc'

export interface SortOptionConfig {
    value: SortOption
    label: string
}
