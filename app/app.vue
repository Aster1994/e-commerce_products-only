<template>
    <div class="rtl">
        <NuxtRouteAnnouncer/>
        <NuxtLayout>
            <NuxtLoadingIndicator :throttle="300"/>
            <NuxtPage/>
        </NuxtLayout>
        <ToastContainer/>
    </div>
</template>

<script setup lang="ts">
import ToastContainer from "~/components/ui/ToastContainer.vue";
</script>

