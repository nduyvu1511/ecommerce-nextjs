import { RootState } from "@/core/store"
import { Product, ProductDetail as IProductDetail } from "@/models"
import {
  setAttributeList,
  setProduct as setProductStore,
  toggleModalProduct,
} from "@/modules"
import productApi from "@/services/productApi"
import { memo, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useProductDetail } from "shared/hook"
import {
  getAttributeList,
  getListAttributeId,
  isArrayHasValue,
  isObjectHasValue,
  mergeProductAndProductDetail,
} from "@/helper"
import { ProductDetailLoading } from "../loader"
import { Modal } from "../modal"
import { ProductDetail } from "./productDetail"

export const ModalProductDetail = memo(function ModalProductDetailChild() {
  const dispatch = useDispatch()
  const { isOpenModalProduct } = useSelector((state: RootState) => state.common)
  const { product: productProps } = useSelector(
    (state: RootState) => state.product
  )

  const [product, setProduct] = useState<IProductDetail | null>(null)
  const [isLoading, setLoading] = useState<boolean>(false)

  const { product: productDetail } = useProductDetail({
    product: product as IProductDetail,
  })

  useEffect(() => {
    if (!productProps?.product_tmpl_id) return

    setLoading(true)

    productApi
      .getProductDetail({
        product_id: productProps.product_prod_id,
        list_products: [getListAttributeId(productProps)],
      })
      .then((res: any) => {
        const result = res.result
        setLoading(false)

        if (result?.success) {
          setProduct(
            mergeProductAndProductDetail({
              product: productProps,
              productDetail: result.data.detail as IProductDetail,
            })
          )
        }
      })
      .catch(() => {
        setLoading(false)
      })

    return () => {
      setProduct(null)
    }
  }, [productProps])

  useEffect(() => {
    return () => {
      dispatch(setProductStore(null))
    }
  }, [])

  useEffect(() => {
    if (!productProps?.product_tmpl_id) return

    const attributeList = getAttributeList(productProps)
    if (isArrayHasValue(attributeList)) {
      dispatch(setAttributeList(attributeList))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!isObjectHasValue(product)) return null

  return (
    <>
      <Modal
        preventScrolling
        direction="center"
        isShowModal={isOpenModalProduct}
        handleClickModal={() => dispatch(toggleModalProduct(false))}
      >
        {isLoading && !isObjectHasValue(product) ? (
          <div className="container">
            <ProductDetailLoading />
          </div>
        ) : null}

        {isObjectHasValue(product) ? (
          <ProductDetail
            isLoading={false}
            type="modal"
            handleClickModal={() => dispatch(toggleModalProduct(false))}
            product={
              productDetail && productDetail?.product_tmpl_id
                ? (productDetail as IProductDetail)
                : (product as Product)
            }
          />
        ) : null}
      </Modal>
    </>
  )
})
