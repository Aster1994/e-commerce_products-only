// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import env from "./app/lib/env.ts";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: import.meta.dev},
    css: ["~/assets/css/main.css"],

    modules: [
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxt/fonts',
        '@nuxt/eslint',
        '@nuxtjs/seo', // sitemap.xml / robots.txt automation + useSeoMeta;
        '@pinia/nuxt',
    ],

    image: {
        domains: ['fakestoreapi.com'],
        format: ['webp'],
    },

    icon: {
        customCollections: [
            {
                prefix: 'fig',
                dir: './app/assets/icons',
            },
        ],
        serverBundle: 'local', // bundle at build time, no Iconify API calls in prod
    },

    site: {
        url: env.NUXT_PUBLIC_SITE_URL,
        name: 'فروشگاه تست',
    },

    seo: {
        meta: {
            title: 'فروشگاه',
            description: 'فروشگاه تست محصولات با امکان جستجو، فیلتر و مشاهده جزئیات.',
            robots: env.NUXT_PUBLIC_APP_ENV === 'production'
                ? 'index, follow'
                : 'noindex, nofollow',
            themeColor: [
                {content: '#E20054', media: '(prefers-color-scheme: light)'},
            ],
        },
    },

    sitemap: {
        sources: ['/api/__sitemap__/products']
    },

    robots: {
        disallow: env.NUXT_PUBLIC_APP_ENV === 'production'
            ? []
            : ['/'],
    },

    runtimeConfig: {
        ipx: {
            http: {
                domains: ['fakestoreapi.com'],
            },
        },
        public: {
            apiBaseUrl: env.NUXT_PUBLIC_API_BASE_URL,
            siteUrl: env.NUXT_PUBLIC_SITE_URL,
        }
    },

    vite: {
        plugins: [tailwindcss() as any],
    },

    typescript: {
        includeWorkspace: true,
    },

    eslint: {
        config: {
            standalone: false,
        },
    },

})
