import { CompareModal, ModalProductDetail, Toast } from "@/components"
import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import React from "react"
import { useSelector } from "react-redux"

export const ModalContainer = () => {
  const { isOpenModalProduct } = useSelector((state: RootState) => state.common)
  const { isShowCompareModal } = useSelector(
    (state: RootState) => state.compare
  )
  const { product } = useSelector((state: RootState) => state.product)

  return (
    <div className="modal__container">
      <div className="modal__container-compare">
        {isShowCompareModal ? (
          <CompareModal isShowModal={isShowCompareModal} />
        ) : null}
      </div>

      {isOpenModalProduct && isObjectHasValue(product) ? (
        <ModalProductDetail />
      ) : null}
      <Toast />
    </div>
  )
}
