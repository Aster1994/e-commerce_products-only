<script lang="ts" setup>
import {useProductFiltersStore} from '~/stores/productFilters'
import {getCategoryLabel, SORT_OPTIONS} from '~/constants/product.ts'
import BaseCard from "~/components/ui/BaseCard.vue";
import BaseInput from "~/components/ui/Form/BaseInput.vue";
import BaseBtn from "~/components/ui/BaseBtn.vue";
import BaseAccordion from "~/components/ui/BaseAccordion.vue";
import BaseRadio from "~/components/ui/Form/BaseRadio.vue";
import BaseCheckbox from "~/components/ui/Form/BaseCheckbox.vue";

const props = defineProps<{
    categoryCounts: Map<string, number>
}>()

const store = useProductFiltersStore()

const searchDraft = ref(store.search)
watch(
    () => store.search,
    (value) => (searchDraft.value = value),
)

function submitSearch() {
    store.setSearch(searchDraft.value)
}

const selectedCategories = computed<string[]>({
    get: () => store.categories,
    set: (value) => store.setCategories(value),
})

const categoryEntries = computed(() => Array.from(props.categoryCounts.entries()))
</script>

<template>
    <div class="flex flex-col gap-4">
        <BaseCard class="flex flex-col gap-3" padding="sm">
            <h2 class="text-[13px] font-medium text-gray-700">فیلتر و جستجو</h2>

            <form class="flex flex-col gap-4" @submit.prevent="submitSearch">
                <BaseInput
                    v-model="searchDraft"
                    clearable
                    placeholder="جستجوی محصول..."
                    prepend-icon="fig:search"
                    @clear="submitSearch"
                />

                <BaseBtn class="w-full" type="submit">جستجو</BaseBtn>
            </form>
        </BaseCard>

        <BaseAccordion title="مرتب سازی">
            <BaseRadio
                v-for="option in SORT_OPTIONS"
                :id="`sort-${option.value}`"
                :key="option.value"
                :model-value="store.sort"
                :value="option.value"
                name="sort"
                @update:model-value="store.setSort($event as typeof option.value)"
            >
                {{ option.label }}
            </BaseRadio>
        </BaseAccordion>

        <BaseAccordion title="دسته بندی">
            <label
                v-for="[category, count] in categoryEntries"
                :key="category"
                class="flex items-center justify-between gap-2"
            >
                <BaseCheckbox v-model="selectedCategories" :value="category">
                    {{ getCategoryLabel(category) }}
                </BaseCheckbox>
                <span
                    :class="selectedCategories.includes(category) ? 'bg-primary' : 'bg-[#141928]'"
                    class="flex h-6 min-w-6 items-center justify-center rounded-md px-1 text-xs font-medium text-gray-0"
                >
          {{ count }}
        </span>
            </label>
        </BaseAccordion>
    </div>
</template>