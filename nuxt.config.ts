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
        '@nuxt/eslint',
        '@nuxt/fonts'
    ],

    runtimeConfig: {
        apiBaseUrl: env.NUXT_PUBLIC_API_BASE_URL,
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
