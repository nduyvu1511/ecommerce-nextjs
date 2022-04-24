import { AuthSlice, UserInfo } from "@/models"
import { createSlice } from "@reduxjs/toolkit"

const initialState: AuthSlice = {
  currentToken: undefined,
  phoneNumber: undefined,
  currentUserInfo: undefined,
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentToken: (state, { payload }: { payload: string | undefined }) => {
      state.currentToken = payload
    },

    setPhoneNumber: (state, { payload }: { payload: string | undefined }) => {
      state.phoneNumber = payload
    },

    setCurrentUserInfo: (
      state,
      { payload }: { payload: UserInfo | undefined }
    ) => {
      state.currentUserInfo = payload
    },

    clearAuthData: (state) => {
      state.currentToken = undefined
      state.phoneNumber = undefined
    },
  },
})

export const {
  setCurrentToken,
  clearAuthData,
  setPhoneNumber,
  setCurrentUserInfo,
} = authSlice.actions

export default authSlice.reducer
