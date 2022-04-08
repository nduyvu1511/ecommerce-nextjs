import { formatMoneyVND } from "@/helper"
import { CartItem as ICartItem } from "@/models"
import { deleteCartItem } from "@/modules"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
import Link from "next/link"
import { BiTrash } from "react-icons/bi"
import { MdOutlineClose } from "react-icons/md"
import { useDispatch } from "react-redux"

interface InterfaceCartItem {
  cart: ICartItem
  handleClose?: Function
}

export const CartItem = ({ cart, handleClose }: InterfaceCartItem) => {
  const dispatch = useDispatch()
  const handleDelete = () => {
    dispatch(
      deleteCartItem({
        product_prod_id: cart.product_prod_id,
        product_tmpl_id: cart.product_tmpl_id,
      })
    )
  }

  return (
    <div className="cart__item">
      <div className="cart__item-image">
        <Link passHref href={`/product/${cart.product_tmpl_id}`}>
          <div
            onClick={() => {
              handleClose && handleClose()
            }}
            className="image-container cart__item-image-wrapper cursor-pointer"
          >
            <Image
              src={`${DOMAIN_URL}${cart.image_url[0]}`}
              alt={cart.product_name}
              className="image"
              layout="fill"
            />
          </div>
        </Link>
      </div>

      <div className="cart__item-info">
        <Link href={`/product/${cart.product_tmpl_id}`} passHref>
          <a
            onClick={() => {
              handleClose && handleClose()
            }}
            className="cart__item-info-name"
          >
            {cart.product_name}
          </a>
        </Link>

        {(cart?.attribute_names?.length || 0) > 0 ? (
          <span className="cart__item-info-type">
            ({cart.attribute_names?.join(", ") || ""})
          </span>
        ) : null}

        <div className="cart__item-info-bottom">
          <div className="cart__item-info-bottom-content">
            <p className="cart__item-info-bottom-quantity">{cart.quantity}</p>
            <MdOutlineClose />
            <p className="cart__item-info-bottom-price">
              {formatMoneyVND(cart.price)}
            </p>
          </div>
          <button
            onClick={handleDelete}
            className="btn-reset cart__item-btn-delete"
          >
            <BiTrash />
          </button>
        </div>
      </div>
    </div>
  )
}