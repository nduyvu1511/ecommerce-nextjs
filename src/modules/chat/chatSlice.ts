import { createSlice } from "@reduxjs/toolkit"
import { Channel, Message } from "models"

interface ChatSliceParams {
  isOpenChatDesktop: boolean
  isOpenChatMobile: boolean
  isExpandChatModal: boolean
  currentChannel: Channel | undefined
  messages: Message[] | undefined
  isMessageLoading: boolean
  messageUnreadCount: number | undefined
}

const initialState: ChatSliceParams = {
  isOpenChatDesktop: false,
  isOpenChatMobile: false,
  isExpandChatModal: false,
  currentChannel: undefined,
  messages: undefined,
  isMessageLoading: false,
  messageUnreadCount: undefined,
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    toggleOpenChatDesktop: (state, { payload }: { payload: boolean }) => {
      state.isOpenChatDesktop = payload
      const htmlTag = document.querySelector("html")
      if (htmlTag) {
        htmlTag.style.overflow = payload ? "hidden" : "unset"
      }
      if (state.isExpandChatModal) {
        state.isExpandChatModal = false
      }
    },

    toggleOpenChatMobile: (state, { payload }: { payload: boolean }) => {
      state.isOpenChatMobile = payload
      const htmlTag = document.querySelector("html")
      if (htmlTag) {
        htmlTag.style.overflow = payload ? "hidden" : "unset"
      }
      // if (state.isExpandChatModal) {
      //   state.isExpandChatModal = false
      // }
    },

    toggleExpandChatModal: (state, { payload }: { payload: boolean }) => {
      state.isExpandChatModal = payload
    },

    setCurrentChannel: (
      state,
      { payload }: { payload: Channel | undefined }
    ) => {
      state.currentChannel = payload
    },

    setMessages: (state, { payload }: { payload: undefined | Message[] }) => {
      state.messages = payload

      if (payload) {
        state.messages = payload.reverse()
      }
    },

    addMessage: (state, { payload }: { payload: Message }) => {
      if (!state.messages) return
      state.messages.push(payload)
    },

    setMessageLoading: (state, { payload }: { payload: boolean }) => {
      state.isMessageLoading = payload
    },

    setMessageUnreadCount: (state, { payload }: { payload: number }) => {
      state.messageUnreadCount = payload
    },
  },
})

export const {
  toggleExpandChatModal,
  toggleOpenChatDesktop,
  setCurrentChannel,
  setMessages,
  addMessage,
  setMessageLoading,
  toggleOpenChatMobile,
  setMessageUnreadCount,
} = chatSlice.actions

export default chatSlice.reducer
