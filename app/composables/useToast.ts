import {ref} from 'vue'

interface Toast {
    id: number,
    type: string,
    title: string,
    text?: string,
    duration?: number,
}

const toasts: Ref<Toast[]> = ref([])


export function useToast() {
    let id = 0
    const showToast = (toast: Partial<Toast>) => {
        const $toast: Toast = {
            id: id++,
            type: toast.type || 'info',
            title: toast.title || '',
            text: toast.text || '',
            duration: toast.duration || 10000,
        }

        setTimeout(() => {
            dismiss($toast)
        }, toast.duration || 10000)
        toasts.value.push($toast)
    }

    const pushToast = (n: Partial<Toast>) => {
        showToast({type: n.type, title: n.title, text: n.text})
    }
    const dismiss = (toast: Toast) => {
        toasts.value = toasts.value.filter((t: Partial<Toast>) => {
            return t.id !== toast.id
        })
    }
    return {toasts, pushToast, dismiss}
}
