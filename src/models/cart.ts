import { Product } from "./product"

export interface CartItem extends Product {
  quantity: number
  partner_id: number
  attribute_names?: Array<string>
}

export interface CartQuantity {
  id: number
  quantity: number
}

export interface CartSlice {
  data: CartItem[]
}
