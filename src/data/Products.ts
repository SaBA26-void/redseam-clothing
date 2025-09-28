import { get } from './ApiClient'

export interface ListingProduct {
  available_colors: string[]
  available_sizes: string[]
  cover_image: string
  description: string
  id: string
  images: string[]
  name: string
  price: number
  release_year: string
  brand: {
    id: number
    name: string
    image: string
  }
}

export type SortOrder = 'price' | '-price' | 'created_at' | ''

export interface ProductListingFilters {
  price_from?: number | null
  price_to?: number | null
}

export interface FetchProductsMeta {
  current_page: number
  current_page_url: string
  from: number
  path: string
  per_page: number
  to: number
  total: number
}

export interface FetchProducts {
  data: ListingProduct[]
  links: {
    first: string
    last: string
    prev: string
    next: string
  }
  meta: FetchProductsMeta
}

export function fetchProducts(filters: ProductListingFilters, sort: SortOrder = '', page: number = 1): Promise<FetchProducts> {
  const queryString = new URLSearchParams()
  queryString.append('sort', sort)
  queryString.append('filter[price_from]', filters.price_from?.toString() || '')
  queryString.append('filter[price_to]', filters.price_to?.toString() || '')
  queryString.append('page', page.toString())

  return get<FetchProducts>(`/products?${queryString.toString()}`)
}

export function fetchProductById(id: number): Promise<ListingProduct> {
  return get<ListingProduct>(`/products/${id}`)
}
