import React, { useState, useCallback, type ChangeEvent, useEffect } from 'react'

import type { ProductListingFilters } from '../../data/Products'
import useOutsideClick from '../../hooks/useOutsideClick'

import './ProductFilter.scss'

export interface ProductFilterProps {
  onChange: (filters: ProductListingFilters) => void
  filters: ProductListingFilters
}

export default function ProductFilter(props: ProductFilterProps) {
  const { onChange, filters } = props

  const [isActive, setIsActive] = useState(false)
  const [priceFrom, setPriceFrom] = useState(filters.price_from)
  const [priceTo, setPriceTo] = useState(filters.price_to)

  const ref = useOutsideClick<HTMLDivElement>(() => setIsActive(false))

  const handlePriceFromChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPriceFrom(Number(e.target.value))
  }, [])
  const handlePriceToChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPriceTo(Number(e.target.value))
  }, [])
  const handleClick = useCallback(() => {
    setIsActive(isActive => !isActive)
  }, [])

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsActive(false)
    const formData = new FormData(e.target as HTMLFormElement)
    onChange({
      price_from: Number(formData.get('price_from')) || null,
      price_to: Number(formData.get('price_to')) || null,
    })
  }, [onChange])

  useEffect(() => {
    setPriceFrom(filters.price_from)
    setPriceTo(filters.price_to)
  }, [filters])

  return (
    <div ref={ref} className="product-filter">
      <div onClick={handleClick}>
        <button className="button">Filter</button>
      </div>
      <div className={`product-filter-overlay ${isActive ? 'product-filter-overlay--open' : ''}`}>
        <form onSubmit={handleSubmit}>
          <h4>Select price</h4>
          <div className="inputs-wrapper">
            <input
              onChange={handlePriceFromChange}
              value={priceFrom?.toString() || ''}
              name="price_from"
              type="number"
              placeholder="From"
            />
            <input
              onChange={handlePriceToChange}
              value={priceTo?.toString() || ''}
              name="price_to"
              type="number"
              placeholder="To"
            />
          </div>
          <div className="apply-wrapper">
            <button type="submit">Apply</button>
          </div>
        </form>
      </div>
    </div>
  )
}
