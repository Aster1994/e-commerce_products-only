<template>
    <main>
        <Header class="px-4 md:px-20 2xl:px-[10.25rem]"/>
        <div class="px-4 md:px-20 2xl:px-[10.25rem]">
            <slot/>
        </div>
        <Footer/>
    </main>
</template>


<script setup lang="ts">
import Header from "~/components/layout/Header.vue";
import Footer from "~/components/layout/Footer.vue";
</script>