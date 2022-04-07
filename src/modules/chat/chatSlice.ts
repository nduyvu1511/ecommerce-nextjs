import { ChatSliceProps, Message, MessagesInChannel } from "@/models"
import { createSlice } from "@reduxjs/toolkit"
import { isArrayHasValue } from "../../shared/helper/functions"
import {
  fetchGetChannels,
  fetchGetMessagesInChannel,
  fetchSearchChannel
} from "./chatThunk"

const initialState: ChatSliceProps = {
  channel: {
    data: [],
    isLoading: false,
  },
  search: {
    data: [],
    isLoading: false,
    initData: [],
  },
  currentChannelIdActive: 0,
  messageInChannel: {
    data: {} as MessagesInChannel,
    isLoading: false,
  },
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setSearchChannel: (state) => {
      state.search.data = [...state.search.initData]
    },

    addMessage: (state, { payload }: { payload: Message }) => {
      if (state.messageInChannel.data?.channel_messages?.length > 0) {
        state.messageInChannel.data.channel_messages.push(payload)
      }
    },

    clearMessageInChannel: (state) => {
      state.messageInChannel.data = {} as MessagesInChannel
    },
  },
  extraReducers: (builder) => {
    //   Get channel
    builder.addCase(fetchGetChannels.fulfilled, (state, { payload }) => {
      state.channel.isLoading = false
      const result = payload?.data.result
      if (result.success) {
        state.channel.data = result.data
      }
    })
    builder.addCase(fetchGetChannels.pending, (state) => {
      state.channel.isLoading = true
    })

    //   Search channel
    builder.addCase(fetchSearchChannel.fulfilled, (state, { payload }) => {
      state.search.isLoading = false
      const result = payload?.data.result
      if (result.success) {
        if (!isArrayHasValue(state.search.initData)) {
          state.search.initData = result.data
        }
        state.search.data = result.data
      }
    })
    builder.addCase(fetchSearchChannel.pending, (state) => {
      state.search.isLoading = true
    })

    //   Get Messages
    builder.addCase(
      fetchGetMessagesInChannel.fulfilled,
      (state, { payload }) => {
        state.messageInChannel.isLoading = false
        const result = payload?.data.result
        if (result.success) {
          result.data?.channel_messages?.reverse()
          state.messageInChannel.data = result.data
        }
      }
    )
    builder.addCase(fetchGetMessagesInChannel.pending, (state) => {
      state.messageInChannel.isLoading = true
    })
  },
})

export default chatSlice.reducer

export const { setSearchChannel, addMessage, clearMessageInChannel } =
  chatSlice.actions
