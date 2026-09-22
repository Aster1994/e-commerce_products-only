<template>
    <BaseCard class="flex flex-col gap-3" padding="sm">
        <BaseSkeleton class="aspect-square w-full" rounded="lg"/>
        <BaseSkeleton class="h-4 w-3/4"/>
        <BaseSkeleton class="h-4 w-1/2"/>
        <div class="flex items-center justify-between pt-2">
            <BaseSkeleton class="h-10 w-full"/>
        </div>
    </BaseCard>
</template>

<script lang="ts" setup>
import BaseSkeleton from "~/components/ui/BaseSkeleton.vue";
import BaseCard from "~/components/ui/BaseCard.vue";
</script>

