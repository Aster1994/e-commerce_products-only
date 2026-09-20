import type {ApiError} from '~/types/api'

export default defineNuxtPlugin(() => {
    const {apiBaseUrl} = useRuntimeConfig().public;
    const {pushToast} = useToast()

    const api = $fetch.create({
        baseURL: apiBaseUrl,
        timeout: 10000,
        retry: 1,
        retryDelay: 500,
        retryStatusCodes: [408, 429, 500, 502, 503, 504],

        onRequestError({request, error}) {
            const apiError: ApiError = {
                statusCode: 0,
                statusMessage: error.message,
                message: 'اتصال به سرور برقرار نشد. اتصال اینترنت خود را بررسی کنید.',
                isNetworkError: true,
                url: String(request),
            }
            handleGlobalError(apiError)
        },

        onResponseError({request, response}) {
            const apiError = normalizeHttpError(response.status, response._data, String(request))
            handleGlobalError(apiError)
        },
    })

    function normalizeHttpError(statusCode: number, data: unknown, url: string): ApiError {
        const serverMessage = (data as { message?: string } | undefined)?.message

        const fallbackMessages: Record<number, string> = {
            400: 'درخواست نامعتبر است.',
            401: 'نیاز به ورود مجدد دارید.',
            403: 'شما دسترسی لازم برای این عملیات را ندارید.',
            404: 'موردی که به دنبال آن بودید پیدا نشد.',
            408: 'درخواست بیش از حد طول کشید.',
            409: 'این عملیات با وضعیت فعلی داده تداخل دارد.',
            422: 'داده‌های ارسالی معتبر نیستند.',
            429: 'تعداد درخواست‌ها بیش از حد مجاز است. کمی صبر کنید.',
            500: 'خطایی در سرور رخ داد. لطفاً بعداً دوباره تلاش کنید.',
            502: 'سرور در دسترس نیست.',
            503: 'سرویس موقتاً در دسترس نیست.',
            504: 'زمان پاسخ سرور به پایان رسید.',
        }

        return {
            statusCode,
            statusMessage: serverMessage ?? `HTTP ${statusCode}`,
            message: fallbackMessages[statusCode] ?? 'خطای غیرمنتظره‌ای رخ داد. لطفاً دوباره تلاش کنید.',
            isNetworkError: false,
            url,
        }
    }

    function handleGlobalError(error: ApiError) {
        if (import.meta.dev) {
            // eslint-disable-next-line no-console
            console.error('[API ERROR]', error)
        }

        pushToast({title: 'خطا', text: error.message, type: 'error'})

        if (error.statusCode === 401 && import.meta.client) {
            // e.g. navigateTo('/login')
        }
    }

    return {
        provide: {
            api,
            normalizeApiError: normalizeHttpError,
        },
    }
})