<template>
    <div class="bg-gray-0 rounded-b-4xl h-[4.5rem] md:h-[7.5rem] shadow-card">
        <!--Mobile-->
        <nav class="w-full h-full flex md:hidden justify-between items-center">
            <BaseBtn variant="outline" prepend-icon="fig:menu" rounded="sm" @click="showMobileMenu = !showMobileMenu"/>
            <BaseBtn variant="outline" prepend-icon="fig:phone-ring" rounded="sm"/>

            <transition name="submenu">
                <aside v-if="showMobileMenu"
                       class="fixed p-10 h-max top-[5rem] shadow-card bg-gray-0 rounded-4xl z-10">
                    <div class="h-full w-full flex flex-col gap-6">
                        <NuxtLink v-for="link in links" :key="link.id" :to="link.to" class="flex items-center gap-2"
                                  @click="showMobileMenu=false">
                            <Icon :name="link.icon" :size="16"/>
                            <span> {{ link.title }} </span>
                        </NuxtLink>
                    </div>
                </aside>
            </transition>
        </nav>


        <!--Desktop-->
        <nav class="hidden md:flex items-center w-full h-full max-w-max-width-container">
            <div class="h-full w-full flex items-center justify-center gap-6">
                <NuxtLink v-for="link in links" :key="link.id" :to="link.to" class="flex items-center gap-2">
                    <Icon :name="link.icon" :size="16"/>
                    <span> {{ link.title }} </span>
                </NuxtLink>
            </div>

            <div class="pl-4">
                <BaseBtn append-icon="fig:phone-ring">تماس</BaseBtn>
            </div>
        </nav>
    </div>
</template>

<script setup lang="ts">
import BaseBtn from "~/components/ui/BaseBtn.vue";

const showMobileMenu = ref(false)

interface Link {
    id: number;
    title: string,
    to: string,
    icon: string,
}

const links: Link[] = [
    {
        id: 1,
        title: 'لیست محصولات',
        to: '/products',
        icon: 'fig:category-2',
    },
    {
        id: 2,
        title: 'دریافت مشاوره',
        to: '/consulting',
        icon: 'fig:book',
    },
    {
        id: 3,
        title: 'سوالات متداول',
        to: '/faq',
        icon: 'fig:message-question',
    },
    {
        id: 4,
        title: 'تماس با ما',
        to: '/contact',
        icon: 'fig:phone-call',
    },
]
</script>

<style>
.router-link-exact-active {
    position: relative;
    color: var(--color-primary);
}

.router-link-exact-active::before {
    content: '';
    position: absolute;
    right: calc(50% - 2.5px);
    bottom: -8px;
    width: 5px;
    height: 5px;
    background: var(--color-primary);
    border-radius: 100%;
}

/* Smooth submenu animation */
.submenu-enter-active,
.submenu-leave-active {
    transition: all 0.3s ease;
}

.submenu-enter-from,
.submenu-leave-to {
    opacity: 0;
    max-height: 0;
    transform: translateY(-10px);
}

.submenu-enter-to,
.submenu-leave-from {
    opacity: 1;
    max-height: 300px;
    transform: translateY(0);
}
</style>