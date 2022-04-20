import { formatMoneyVND } from "@/helper"
import { CartItem, ProductIds } from "@/models"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { HiOutlineTrash } from "react-icons/hi"
import { RiCloseCircleFill } from "react-icons/ri"
import { InputCheckbox, InputQuantity } from "../inputs"

interface ICartPageItem {
  cart: CartItem
  isChecked?: boolean
  isDisabled?: boolean
  onCheck?: (cart: CartItem) => void
  onDeleteItem?: ({ product_prod_id, product_tmpl_id }: ProductIds) => void
  onUpdateQuantity?: (cart: CartItem) => void
}

export const CartPageItem = ({
  cart,
  isChecked,
  onCheck,
  onDeleteItem,
  onUpdateQuantity,
  isDisabled,
}: ICartPageItem) => {
  const handleUpdateQuantity = (quantity: number) => {
    onUpdateQuantity && onUpdateQuantity({ ...cart, quantity })
  }

  return (
    <li className="cart__page__item">
      <div className="cart__item-check">
        <InputCheckbox
          onCheck={() => onCheck && onCheck(cart)}
          isChecked={isChecked || false}
        />
      </div>

      <div className="cart__item-img">
        <Link passHref href={`/product/${cart.product_tmpl_id}`}>
          <div className="image-container">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDeleteItem &&
                  onDeleteItem({
                    product_tmpl_id: cart.product_tmpl_id,
                    product_prod_id: cart.product_prod_id,
                  })
              }}
              className="btn-reset cart__item-delete-btn"
            >
              <RiCloseCircleFill />
            </button>
            <Image
              quality={40}
              layout="fill"
              className="image"
              src={`${DOMAIN_URL}${cart.image_url[0]}`}
              alt=""
            />
          </div>
        </Link>
      </div>

      <div className="cart__item-info">
        <div className="cart__item-info-name">
          <div className="cart__item-info-name-wrapper">
            <Link href={`/product/${cart.product_tmpl_id}`}>
              <a className="cart__item-info-name-title">{cart.product_name}</a>
            </Link>
            {(cart?.attribute_names?.length || 0) > 0 ? (
              <p className="cart__item-info-name-type">
                <span>Phân loại:</span>
                <span>{cart.attribute_names?.join(", ") || ""}</span>
              </p>
            ) : null}
          </div>

          <InputCheckbox
            onCheck={() => onCheck && onCheck(cart)}
            isChecked={isChecked || false}
          />
        </div>
        <div className="cart__item-info-item cart__item-info-price">
          <p className="cart__item-info-item-title">Giá: </p>
          <p className="info-price-price">{formatMoneyVND(cart.price)}</p>

          <p className="info-price-price-mobile">
            {formatMoneyVND(cart.quantity * cart.price)}
          </p>
        </div>

        <div className="cart__item-info-item cart__item-info-quantity">
          <p className="cart__item-info-item-title">Số lượng</p>
          <InputQuantity
            isDisabled={isDisabled}
            onChangeQuantity={(q: number) => handleUpdateQuantity(q)}
            quantity={cart.quantity}
          />
        </div>

        <div className="cart__item-info-item cart__item-info-subtotal">
          <p className="cart__item-info-item-title">Tổng phụ: </p>
          <p className="info-subtotal-price">
            {formatMoneyVND(cart.quantity * cart.price)}
          </p>
        </div>

        <div className="cart__item-info-item cart__item-info-btn">
          <button
            onClick={() =>
              onDeleteItem &&
              onDeleteItem({
                product_tmpl_id: cart.product_tmpl_id,
                product_prod_id: cart.product_prod_id,
              })
            }
            className="btn-reset"
          >
            <HiOutlineTrash />
          </button>
        </div>
      </div>
    </li>
  )
}
