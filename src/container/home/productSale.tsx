import { ProductSaleItem } from "@/components"
import HomeProductSlideLoading from "@/components/loader/homeProductSlideLoading"
import { ProductSale } from "@/models"
import productApi from "@/services/productApi"
import { useEffect, useState } from "react"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export const ProductSaleContainer = () => {
  const [productsSale, setProductsSale] = useState<ProductSale[]>()
  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    productApi
      .getSaleProductList()
      .then((res: any) => {
        const result = res?.result
        if (result.success) {
          setLoading(false)
          setProductsSale(result.data)
        }
      })
      .catch(() => setLoading(false))
  }, [])

  return (
    <>
      {isLoading ? <HomeProductSlideLoading item={5} /> : null}

      {productsSale && productsSale?.length > 0 ? (
        <div className="container home__sale-container">
          {productsSale?.map((product: ProductSale) => (
            <ProductSaleItem
              key={product.deal_id}
              isLoading={isLoading}
              setProductsSale={(deal_id: number) =>
                setProductsSale([
                  ...productsSale.filter((item) => item.deal_id !== deal_id),
                ])
              }
              productSale={product}
            />
          ))}
        </div>
      ) : null}
    </>
  )
}
