export interface ApiError {
    /** 0 means "no response was ever received" (offline, DNS, CORS, timeout) */
    statusCode: number
    /** Raw status text / server message, for debugging & logs */
    statusMessage: string
    /** User-facing, localized message safe to show in the UI */
    message: string
    isNetworkError: boolean
    /** Original request URL, for debugging */
    url?: string
}