<template>
    <footer class="w-full h-max shadow-card">
        <section
            class="bg-gray-0 px-4 md:px-20 2xl:px-[10.25rem] py-10 grid grid-cols-2 md:grid-cols-4 justify-between gap-y-16 gap-x-4">
            <div class="col-span-2 md:col-span-1 flex flex-col h-full items-center justify-center gap-8">
                <div class="w-[225px] min-h-[65px]"></div>
                <span class="hidden md:inline text-[13px] font-medium text-gray-700 leading-6">
                    هفت روز هفته از ۸ صبح تا ۱۲ شب پاسخگو هستیم
            </span>
            </div>

            <div class="flex flex-col gap-3 w-max">
                <h2 class="text-xl font-bold text-gray-900 mb-3">
                    دسترسی سریع
                </h2>
                <NuxtLink to="/about" class="text-[13px] font-medium text-gray-800">درباره ما</NuxtLink>
                <NuxtLink to="/blog" class="text-[13px] font-medium text-gray-800">بلاگ</NuxtLink>
                <NuxtLink to="/contact" class="text-[13px] font-medium text-gray-800">تماس با ما</NuxtLink>
                <NuxtLink to="/services" class="text-[13px] font-medium text-gray-800">خدمات پس از فروش</NuxtLink>
            </div>

            <div class="flex flex-col gap-3 w-max">
                <h2 class="text-xl font-bold text-gray-900 mb-3">
                    راهنمای سایت
                </h2>
                <NuxtLink to="#" class="text-[13px] font-medium text-gray-800">قوانین و مقررات</NuxtLink>
                <NuxtLink to="/consulting" class="text-[13px] font-medium text-gray-800">دریافت مشاوره</NuxtLink>
                <NuxtLink to="#" class="text-[13px] font-medium text-gray-800">انتقادات و پیشنهادات</NuxtLink>
            </div>

            <div class="flex flex-col gap-3 w-max">
                <h2 class="text-xl font-bold text-gray-900 mb-3">
                    شبکه‌های اجتماعی
                </h2>
                <a class="font-medium flex items-center gap-3" href="#">
                    <Icon :size="16" class="text-gray-500" name="fig:telegram"/>
                    <span class="text-sm text-gray-900">تلگرام</span>
                </a>
                <a class="font-medium flex items-center gap-3" href="#">
                    <Icon :size="16" class="text-gray-500" name="fig:instagram"/>
                    <span class="text-sm text-gray-900">اینستاگرام</span>
                </a>
                <a class="font-medium flex items-center gap-3" href="#">
                    <Icon :size="16" class="text-gray-500" name="fig:linkedin"/>
                    <span class="text-sm text-gray-900">لینکدین</span>
                </a>
            </div>
        </section>

        <section
            class="bg-gray-15 px-4 md:px-20 2xl:px-[10.25rem] pt-7 pb-10 md:pt-10 md:pb-6 flex flex-col md:flex-row">
            <div class="w-full flex justify-center">
                <div class="max-w-[320px] flex flex-col items-center gap-4">
                    <span class="text-[13px] text-gray-700 text-center">تمامی حقوق مادی و معنوی این وبسایت متعلق به می‌باشد و هر گونه کپی برداری پیگرد قانونی دارد.</span>
                    <div class="flex items-center gap-4">
                        <a v-for="social in socialLinks" :key="social.id" :aria-label="social.name"
                           :href="social.link"
                           class="text-primary/50 hover:text-primary ">
                            <Icon :name="social.icon" :size="24"/>
                        </a>

                    </div>
                </div>
            </div>
            <div class="h-max flex justify-center gap-4">
                <NuxtImg src="/assets/images/sabt-digital.png" alt="نشان ملی ثبت"
                         width="72"
                         height="72"
                         densities="x1 x1"
                />
                <NuxtImg src="/assets/images/nemad-etemad.png" alt="نماد اعتماد"
                         width="72"
                         height="72"
                         densities="x1 x1"

                />
            </div>
        </section>
    </footer>
</template>

<script setup lang="ts">

const socialLinks = [
    {
        id: 1,
        name: 'Telegram',
        icon: 'fig:telegram',
        link: '#',
    },
    {
        id: 2,
        name: 'Instagram',
        icon: 'fig:instagram',
        link: '#',
    },
    {
        id: 3,
        name: 'Twitter',
        icon: 'fig:twitter',
        link: '#',
    },
    {
        id: 1,
        name: 'Youtube',
        icon: 'fig:youtube',
        link: '#',
    },
    {
        id: 1,
        name: 'Linkedin',
        icon: 'fig:linkedin',
        link: '#',
    },

]
</script>

<style scoped>
.router-link-exact-active {
    color: var(--color-primary);
}
</style>