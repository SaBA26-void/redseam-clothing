import { Link } from 'react-router'
import type { ListingProduct } from '../../data/Products'

import './ProductCard.scss'

export interface ProductCardProps {
  product: ListingProduct
}

export default function ProductCard(props: ProductCardProps) {
  const { name, cover_image, price, id } = props.product

  return (
    <Link className="product-card" to={`/product/${id}`}>
      <img style={{ maxWidth: '100%' }} src={cover_image} />
      <p>{name}</p>
      <p>$ {price}</p>
    </Link>
  )
}
