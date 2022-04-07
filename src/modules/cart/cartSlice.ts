import { getFromLocalStorage, isExistCart } from "@/helper"
import { CartItem, ProductIds } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

export interface CartSlice {
  data: CartItem[]
}

const initialState: CartSlice = {
  data: getFromLocalStorage("carts") || [],
}

const productSlice = createSlice({
  name: "carts",
  initialState,
  reducers: {
    setCarts: (state, { payload }: { payload: CartItem[] }) => {
      state.data = payload
    },

    addToCart: (state, { payload }: { payload: CartItem }) => {
      if (state.data?.length === 0) {
        state.data = [payload]
        return
      }

      const index = state.data.findIndex((item) => isExistCart(item, payload))

      if (index !== -1) {
        state.data = state.data.map((item) => {
          if (isExistCart(item, payload)) {
            return {
              ...item,
              quantity: (item.quantity += payload.quantity),
            }
          } else {
            return item
          }
        })
      } else {
        state.data.unshift(payload)
      }
    },

    updateCartQuantity: (state, { payload }: { payload: CartItem }) => {
      state.data = state.data.map((item) => {
        if (isExistCart(item, payload)) {
          return {
            ...item,
            quantity: payload.quantity,
          }
        } else {
          return item
        }
      })
    },

    deleteCartItem: (state, { payload }: { payload: ProductIds }) => {
      state.data = [...state.data].filter((item) => !isExistCart(item, payload))
    },

    deleteManyItems: (state, { payload }: { payload: Array<ProductIds> }) => {
      state.data = [...state.data].filter(
        (x) => !payload.find((y) => isExistCart(x, y))
      )
    },

    deleteAllCart: (state) => {
      state.data = []
    },
  },
})

export default productSlice.reducer

export const {
  addToCart,
  deleteCartItem,
  updateCartQuantity,
  deleteManyItems,
  setCarts,
} = productSlice.actions
