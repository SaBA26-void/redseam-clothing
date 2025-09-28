import { fetchDelete, get, patchFormData, post, postFormData } from "./ApiClient"
import type { ListingProduct } from "./Products"

export interface CartItem extends ListingProduct {
    quantity: number
    color: string
    size: string
    total_price: number
}

export function addToCart(productId: number, quantity: number, size: string, color: string): Promise<CartItem[]> {
    const token = JSON.parse(localStorage.getItem('user') || '')?.token

    const formData = new FormData()
    formData.append('quantity', quantity.toString())
    formData.append('size', size)
    formData.append('color', color)

    return postFormData(
        `/cart/products/${productId}`,
        formData,
        {
            'Authorization': `Bearer ${token}`,
        },
    )
}

export function fetchCart(): Promise<CartItem[]> {
    const token = JSON.parse(localStorage.getItem('user') || '')?.token

    return get<CartItem[]>(
        '/cart',
        {
            'Authorization': `Bearer ${token}`,
        },
    )
}

export function patchCart(productId: number, quantity: number) {
    const token = JSON.parse(localStorage.getItem('user') || '')?.token

    return patchFormData(
        `/cart/products/${productId}`,
        { quantity },
        {
            'Authorization': `Bearer ${token}`
        },
    )
}

export function removeCartItem(productId: number) {
    const token = JSON.parse(localStorage.getItem('user') || '')?.token

    return fetchDelete(
        `/cart/products/${productId}`,
        {
            'Authorization': `Bearer ${token}`
        },
    )
}

interface CheckoutData {
    name: string,
    surname: string,
    email: string,
    zip_code: string,
    address: string,
}

export function checkout(checkoutData: CheckoutData) {
    const token = JSON.parse(localStorage.getItem('user') || '')?.token

    return post('/cart/checkout', checkoutData, {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    })
}
