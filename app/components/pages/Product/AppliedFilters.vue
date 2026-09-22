<template>
    <div v-if="chips.length"
         class="flex justify-between items-center gap-3 w-full p-4 rounded-3xl bg-gray-0 shadow-card">
        <span class="text-sm font-medium text-gray-900">فیلترهای اعمال شده</span>
        <div class="flex items-center flex-wrap gap-3">
            <BaseChip v-for="chip in chips" :key="chip.key"
                      :prepend-icon="chip.key === 'search' ? 'fig:search' : chip.key === 'sort' ? 'fig:sort-amount-down' : ''"
                      removable
                      @remove="chip.onRemove">
                {{ chip.label }}
            </BaseChip>
        </div>
    </div>
</template>

<script lang="ts" setup>
import {useProductFiltersStore} from '~/stores/productFilters'
import {getCategoryLabel, getSortLabel} from '~/constants/product.ts'
import BaseChip from "~/components/ui/BaseChip.vue";

const store = useProductFiltersStore()

interface Chip {
    key: string
    label: string
    onRemove: () => void
}

const chips = computed<Chip[]>(() => {
    const items: Chip[] = []

    if (store.search) {
        items.push({key: 'search', label: store.search, onRemove: () => store.setSearch('')})
    }

    for (const category of store.categories) {
        items.push({
            key: `category-${category}`,
            label: getCategoryLabel(category),
            onRemove: () => store.removeCategory(category),
        })
    }

    const sortLabel = getSortLabel(store.sort)
    if (sortLabel) {
        items.push({key: 'sort', label: sortLabel, onRemove: () => store.setSort(null)})
    }

    return items
})

</script>

