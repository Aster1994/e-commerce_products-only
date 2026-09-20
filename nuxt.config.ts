// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from "@tailwindcss/vite";
import env from "./app/lib/env.ts";

export default defineNuxtConfig({
    compatibilityDate: '2025-07-15',
    devtools: {enabled: true},
    css: ["~/assets/css/main.css"],

    modules: [
        '@nuxt/image',
        '@nuxt/icon',
        '@nuxt/fonts',
        '@nuxt/eslint',
        '@nuxtjs/seo', // sitemap.xml / robots.txt automation + useSeoMeta;
        '@pinia/nuxt',
    ],

    icon: {
        customCollections: [
            {
                prefix: 'fig',
                dir: './app/assets/icons',
            },
        ],
        serverBundle: 'local', // bundle at build time, no Iconify API calls in prod
    },

    runtimeConfig: {
        public: {
            apiBaseUrl: env.NUXT_PUBLIC_API_BASE_URL,
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
