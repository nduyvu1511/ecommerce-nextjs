import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { useCountdown, useProduct } from "shared/hook"
import { formatMoneyVND, isArrayHasValue } from "../../helper/functions"
import Countdown from "../common/countdown"

export const ProductPromotion = () => {
  const [days, hours, minutes, seconds] = useCountdown({
    targetDate: `2022-04-30 07:23:58`,
  })
  const { data: products, isValidating } = useProduct({
    key: "products",
    params: { type_get: "new" },
  })

  return (
    <div className="product__horizontal__item">
      {isArrayHasValue(products) && products.length > 0 ? (
        <>
          <div className="product__horizontal__item-img">
            <span className="product-promotion">19%</span>
            <Link
              href={`/product/${
                products[2].attributes.length > 0
                  ? products[2].product_tmpl_id
                  : products[2].product_prod_id
              }`}
              passHref
            >
              <div className="image-container cursor-pointer">
                <Image
                  src={`${DOMAIN_URL}${products?.[1]?.image_url[0]}`}
                  alt=""
                  layout="fill"
                  className="image"
                />
              </div>
            </Link>
          </div>
          <div className="product__horizontal__item-content">
            <div className="content__price">
              <p className="content__price-old">
                {formatMoneyVND(products[2].price)}
              </p>
              <p className="content__price-new">
                {formatMoneyVND(products[2].price)}
              </p>
            </div>
            <p className="product-title">{products[2].product_name}</p>
            {products[0].product_available ? (
              <p className="product-status">in stock</p>
            ) : null}

            <Countdown
              days={days}
              hours={hours}
              minutes={minutes}
              seconds={seconds}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}
