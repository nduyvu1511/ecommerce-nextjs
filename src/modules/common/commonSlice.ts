import {
  BooleanType,
  BreadcrumbItem,
  CommonSlice,
  SetMessageProps,
  ShippingAddress,
} from "@/models"
import { createSlice } from "@reduxjs/toolkit"
import "react-toastify"

const initialState: CommonSlice = {
  isOpenModalProduct: false,
  isOpenModalOptionAccount: false,
  isOpenModalCoupons: false,
  isOpenModalPopup: false,
  isOpenModalConfirm: false,
  isOpenAddressForm: false,
  isChatboxOpen: false,
  isExpandChatbox: false,
  isChannelGroupOpen: false,
  isOpenModalFilter: false,
  isOpenNavLeftModal: false,
  message: {
    isOpen: false,
    title: "",
    type: "success",
    duration: 2000,
    direction: "center",
    size: "medium",
  },
  currentReviewId: 0,
  addressForm: undefined,
  breadcrumbList: undefined,
  isOpenCategoryModal: false,
  isOpenSearchModal: false,
  isOpenCartModal: false,
  isOpenScreenLoading: false,
}

const ModalSlice = createSlice({
  name: "common",
  initialState,
  reducers: {
    toggleModalProduct: (state, { payload }: BooleanType) => {
      state.isOpenModalProduct = payload
    },

    toggleModalCoupons: (state, { payload }: BooleanType) => {
      state.isOpenModalCoupons = payload
    },

    toggleModalAccountOption: (state, { payload }: BooleanType) => {
      state.isOpenModalOptionAccount = payload
    },

    toggleModalPopup: (state, { payload }: BooleanType) => {
      state.isOpenModalPopup = payload
    },

    toggleModalConfirm: (state, { payload }: BooleanType) => {
      state.isOpenModalConfirm = payload
    },

    toggleModalAddressForm: (state, { payload }: BooleanType) => {
      state.isOpenAddressForm = payload
    },

    toggleChatboxOpen: (state, { payload }: BooleanType) => {
      state.isChatboxOpen = payload
    },

    toggleExpandChatbox: (state, { payload }: BooleanType) => {
      state.isExpandChatbox = payload
    },

    toggleOpenChannelGroup: (state, { payload }: BooleanType) => {
      state.isChannelGroupOpen = payload
    },

    toggleOpenMessage: (state, { payload }: BooleanType) => {
      state.message.isOpen = payload
    },

    toggleOpenCategoryModal: (state, { payload }: BooleanType) => {
      state.isOpenCategoryModal = payload
    },
    toggleOpenSearchModal: (state, { payload }: BooleanType) => {
      state.isOpenSearchModal = payload
    },

    setMessage: (state, { payload }: SetMessageProps) => {
      if (state.message.isOpen) {
        state.message.isOpen = false
      }
      state.message.title = payload.title
      state.message.isOpen = payload.isOpen
      state.message.duration = payload?.duration || 2000
      state.message.size = payload?.size || "medium"
      state.message.type = payload?.type || "success"
      state.message.direction = payload?.direction || "center"
    },

    clearMessage: (state) => {
      state.message.title = ""
    },

    setCurrentReviewId: (state, { payload }: { payload: number }) => {
      state.currentReviewId = payload
    },

    setAddressForm: (
      state,
      { payload }: { payload: ShippingAddress | undefined }
    ) => {
      state.addressForm = payload
    },

    setBreadcrumbList: (
      state,
      { payload }: { payload: BreadcrumbItem[] | undefined }
    ) => {
      state.breadcrumbList = payload
    },

    toggleOpenModalFilter: (state, { payload }: { payload: boolean }) => {
      state.isOpenModalFilter = payload
    },

    toggleOpenCartModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenCartModal = payload
    },

    toggleOpenNavLeftModal: (state, { payload }: { payload: boolean }) => {
      state.isOpenNavLeftModal = payload
    },

    toggleOpenScreenLoading: (state, { payload }: { payload: boolean }) => {
      state.isOpenScreenLoading = payload
    },
  },
})

export default ModalSlice.reducer

export const {
  toggleChatboxOpen,
  toggleExpandChatbox,
  toggleModalAccountOption,
  toggleModalAddressForm,
  toggleModalConfirm,
  toggleModalCoupons,
  toggleModalPopup,
  toggleModalProduct,
  toggleOpenChannelGroup,
  toggleOpenMessage,
  clearMessage,
  setMessage,
  setAddressForm,
  setCurrentReviewId,
  setBreadcrumbList,
  toggleOpenModalFilter,
  toggleOpenCategoryModal,
  toggleOpenSearchModal,
  toggleOpenCartModal,
  toggleOpenNavLeftModal,
  toggleOpenScreenLoading,
} = ModalSlice.actions
