import type { ListingProduct } from '../../data/Products'

export interface ProductCardProps {
  product: ListingProduct
}

export default function ProductCard(props: ProductCardProps) {
  const { name, cover_image, price } = props.product
  return (
    <div>
      <img style={{ maxWidth: '100%' }} src={cover_image} />
      <p>{name}</p>
      <p>$ {price}</p>
    </div>
  )
}
