import { useEffect, useState } from 'react'

import {
  type SortOrder,
  type ProductListingFilters,
  type FetchProducts,
  fetchProducts,
} from '../../data/Products'

import ProductCard from './ProductCard'
import ProductFilter from './ProductFilter'
import ProductSort from './ProductSort'
import Pagination from './Pagination'

export default function ProductListing() {
  const [filters, setFilters] = useState<ProductListingFilters>({})
  const [page, setPage] = useState(1)
  const [sort, setSort] = useState<SortOrder>('')
  const [productsListing, setProductsListing] = useState<FetchProducts | null>(null)

  useEffect(() => {
    fetchProducts(filters, sort, page)
      .then((data) => {
        setProductsListing(data)
      })
  }, [filters, page, sort])

  const showingFrom = productsListing ? productsListing.meta.current_page * productsListing.meta.per_page : 1
  const showingTo = productsListing ? showingFrom + productsListing.meta.per_page : 1
  const total = productsListing ? productsListing.meta.total : 1

  return (
    <main>
      <div>
        <h1>Products</h1>
        <div>
          <p>Showing {showingFrom}-{showingTo} of {total} results</p>
          <ProductFilter filters={filters} onChange={setFilters} />
          <ProductSort sort={sort} onChange={setSort} />
        </div>
      </div>
      <div>
        {(filters.price_from || filters.price_to) ? (
          <div>
            Price:
            {filters.price_from} - {filters.price_to}
            <button onClick={() => setFilters({})}>X</button>
          </div>
        ) : null}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '2.4rem' }}>
        {productsListing?.data ? (
          productsListing.data.map((product) => <ProductCard product={product} />)
        ) : undefined}
      </div>
      <Pagination page={page} onChange={setPage} meta={productsListing?.meta} />
    </main>
  )
}
