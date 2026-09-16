<template>
    <div class="rtl">
        <NuxtRouteAnnouncer/>
        <NuxtLayout>
            <NuxtLoadingIndicator :throttle="300"/>
            <NuxtPage/>
        </NuxtLayout>
    </div>
</template>

<script setup lang="ts">
</script>

