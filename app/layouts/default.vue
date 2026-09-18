<template>
    <main>
        <Header class="px-4 md:px-20 2xl:px-[10.25rem]"/>
        <div>
            <slot/>
        </div>
    </main>
</template>


<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
</script>