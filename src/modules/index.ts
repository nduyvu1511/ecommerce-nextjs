import { combineReducers } from "@reduxjs/toolkit"
import cartSlice from "./cart/cartSlice"
import commonSlice from "./common/commonSlice"
import userSlice from "./user/userSlice"
import compareSlice from "./compare/compareSlice"
import orderSlice from "./order/orderSlice"
import productSlice from "./product/productSlice"

const rootReducer = combineReducers({
  compare: compareSlice,
  cart: cartSlice,
  common: commonSlice,
  user: userSlice,
  order: orderSlice,
  product: productSlice,
})

export default rootReducer

export * from "./compare/compareSlice"
export * from "./cart/cartSlice"
export * from "./chat/chatSlice"
export * from "./common/commonSlice"
export * from "./user/userSlice"
export * from "./order/orderSlice"
export * from "./product/productSlice"
