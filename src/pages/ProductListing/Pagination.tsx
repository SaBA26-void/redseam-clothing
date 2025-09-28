import React, { useCallback } from 'react'
import type { FetchProductsMeta } from '../../data/Products'

import './Pagination.scss'

export interface PaginationProps {
  meta?: FetchProductsMeta
  page: number
  onChange: (page: number) => void
}

export default function Pagination(props: PaginationProps) {
  const { meta, page, onChange } = props

  const handlePaginationClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    const value = (e.target as HTMLButtonElement).value
    onChange(Number(value))
  }, [onChange])

  if (!meta)
    return null

  const totalPages = Math.ceil(meta.total / meta.per_page)

  return (
    <div className="pagination">
      <button onClick={handlePaginationClick} value={page - 1} disabled={page == 1}>{'<'}</button>
      {Array.from(Array(totalPages).keys()).map((key) => (
        <button
          key={key}
          onClick={handlePaginationClick}
          value={key + 1}
          className={page === key + 1 ? 'active' : undefined}
        >
          {key + 1}
        </button>
      ))}
      <button onClick={handlePaginationClick} value={page + 1} disabled={page == totalPages}>{'>'}</button>
    </div>
  )
}
