import { ProductSaleItem } from "@/components"
import { isArrayHasValue } from "@/helper"
import { ProductSale } from "@/models"
import productApi from "@/services/productApi"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import useSWR from "swr"

export const ProductSaleContainer = () => {
  const {
    data: productSales,
    isValidating,
    mutate,
  } = useSWR(
    "product_deals",
    () =>
      productApi.getSaleProductList().then((res: any) => {
        if (isArrayHasValue(res?.result?.data)) {
          return res?.result?.data
        }
        return []
      }),
    {
      revalidateOnFocus: false,
    }
  )

  return (
    <>
      {productSales && productSales?.length > 0 ? (
        <div className="container home__sale-container">
          {productSales?.map((product: ProductSale) => (
            <ProductSaleItem
              key={product.deal_id}
              isLoading={isValidating}
              setProductsSale={(deal_id: number) =>
                mutate([
                  ...productSales.filter(
                    (item: ProductSale) => item.deal_id !== deal_id
                  ),
                  ,
                  false,
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
