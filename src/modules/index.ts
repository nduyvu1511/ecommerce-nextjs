import { combineReducers } from "@reduxjs/toolkit"
import authSlice from "./auth/authSlice"
import chatSlice from "./chat/chatSlice"
import commonSlice from "./common/commonSlice"
import compareSlice from "./compare/compareSlice"
import localeSlice from "./locale/localeSlice"
import orderSlice from "./order/orderSlice"
import productSlice from "./product/productSlice"
import searchSlice from "./search/searchSlice"
import userSlice from "./user/userSlice"

const rootReducer = combineReducers({
  compare: compareSlice,
  common: commonSlice,
  user: userSlice,
  order: orderSlice,
  product: productSlice,
  auth: authSlice,
  search: searchSlice,
  locale: localeSlice,
  chat: chatSlice,
})

export default rootReducer

export * from "./auth/authSlice"
export * from "./chat/chatSlice"
export * from "./common/commonSlice"
export * from "./compare/compareSlice"
export * from "./locale/localeSlice"
export * from "./order/orderSlice"
export * from "./product/productSlice"
export * from "./search/searchSlice"
export * from "./user/userSlice"
export * from "./chat/chatSlice"
