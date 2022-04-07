import { Product } from "@/models"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { formatMoneyVND } from "../../helper/functions"
import { ProductListLoading } from "../loader"

interface ProductTrendingProps {
  product: Product
  isLoading: boolean
}

export const ProductTrending = ({
  product,
  isLoading,
}: ProductTrendingProps) => {
  return (
    <>
      {isLoading ? (
        <ProductListLoading />
      ) : (
        <div className="product__trending-item">
          <div className="item__left">
            <Link passHref href={`product/${product.product_tmpl_id}`}>
              <div className="image-container cursor-pointer">
                <Image
                  className="image"
                  src={`${DOMAIN_URL}${product.image_url?.[0]}`}
                  alt=""
                  layout="fill"
                />
              </div>
            </Link>
          </div>
          <div className="item__right">
            <Link passHref href={`product/${product.product_tmpl_id}`}>
              <a className="item__right-title">{product.product_name}</a>
            </Link>
            <div className="item__right-price">
              <p className="item__right-price-new">
                {formatMoneyVND(product.price_orgin)}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
