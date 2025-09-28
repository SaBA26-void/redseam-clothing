import { useCallback, useState, type MouseEvent, } from 'react'

import { type SortOrder } from '../../data/Products'
import useOutsideClick from '../../hooks/useOutsideClick'

import './ProductSort.scss'

export interface ProductSortProps {
  onChange: (sort: SortOrder) => void
  sort: SortOrder
}

function getSortText(sort: SortOrder): string {
  switch(sort) {
  case '':
    return 'Order by'
  case '-price':
    return 'Price, hight to low'
  case 'price':
    return 'Price, low to hight'
  case 'created_at':
    return 'New products first'
  }
}

export default function ProductSort(props: ProductSortProps) {
  const { onChange, sort } = props

  const [isActive, setIsActive] = useState(false)

  const handleSortClick = useCallback(() => {
    setIsActive((isActive) => !isActive)
  }, [])

  const handleSortChange = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    onChange((e.target as HTMLButtonElement).value as SortOrder)
    setIsActive(false)
  }, [onChange])

  const ref = useOutsideClick<HTMLDivElement>(() => setIsActive(false))

  return (
    <div ref={ref} className="product-sort">
      <button className="button" onClick={handleSortClick}>{getSortText(sort)}</button>
      <div className={`product-sort-overlay ${isActive ? 'product-sort-overlay--open' : ''}`}>
        <h4>Sort by</h4>
        <button className="button" value="created_at" onClick={handleSortChange}>{getSortText('created_at')}</button>
        <button className="button" value="price" onClick={handleSortChange}>{getSortText('price')}</button>
        <button className="button" value="-price" onClick={handleSortChange}>{getSortText('-price')}</button>
      </div>
    </div>
  )
}
