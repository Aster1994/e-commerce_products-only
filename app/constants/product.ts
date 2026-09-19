export interface SortOptionConfig {
    value: SortOption
    label: string
}

export const SORT_OPTIONS: SortOptionConfig[] = [
    {value: 'count-asc', label: 'تعداد: کم به زیاد'},
    {value: 'count-desc', label: 'تعداد: زیاد به کم'},
    {value: 'rating-desc', label: 'رتبه: زیاد به کم'},
    {value: 'rating-asc', label: 'رتبه: کم به زیاد'},
]

export function getSortLabel(sort: SortOption | null): string | null {
    return SORT_OPTIONS.find((option) => option.value === sort)?.label ?? null
}

export type SortOption = 'count-asc' | 'count-desc' | 'rating-desc' | 'rating-asc'

export interface ProductFiltersState {
    search: string
    categories: string[]
    sort: SortOption | null
    page: number
}

const CATEGORY_LABELS: Record<string, string> = {
    "men's clothing": 'پوشاک مردانه',
    "women's clothing": 'پوشاک زنانه',
    jewelery: 'جواهرات',
    electronics: 'لوازم الکترونیکی',
}

export function getCategoryLabel(category: string): string {
    return CATEGORY_LABELS[category] ?? category
}