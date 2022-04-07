import { ShippingAddress, UserEdit, UserInfo, UserSlice } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: UserSlice = {
  token: "",
  addressDefault: undefined,
  userInfo: {} as UserInfo,
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = ""
      state.userInfo = {} as UserInfo
    },

    setToken: (state, { payload }: { payload: string }) => {
      state.token = payload
    },

    setUserInfo: (state, { payload }: { payload: UserInfo }) => {
      state.userInfo = payload
    },

    editUserInfo: (state, { payload }: { payload: UserEdit }) => {
      state.userInfo.name = payload.name
      state.userInfo.email = payload.email
      state.userInfo.sex = payload.sex
    },

    setAddressDefault: (
      state,
      { payload }: { payload: ShippingAddress | undefined }
    ) => {
      state.addressDefault = payload
    },
  },
})

export const {
  logOut,
  setToken,
  setUserInfo,
  setAddressDefault,
  editUserInfo,
} = userSlice.actions

export default userSlice.reducer
