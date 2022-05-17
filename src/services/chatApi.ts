import {
  CreateChannelProps,
  GetMessageProps,
  SearchChannelProps,
  SendMessageProps,
  Token,
} from "@/models"
import axiosClient from "."

const chatApi = {
  getChannels: (token: Token) => {
    return axiosClient.post("/information_channel/get_channel", {
      params: token,
    })
  },

  searchChannel: (params: SearchChannelProps) => {
    return axiosClient.post("/information_channel/search_channel", {
      params: params,
    })
  },

  createChannel: (params: CreateChannelProps) => {
    return axiosClient.post("/information_channel/create_group_channel", {
      params: params,
    })
  },

  sendMessage: (params: SendMessageProps) => {
    return axiosClient.post("/message/send_message", {
      params: params,
    })
  },

  getMessagesInChannel: (params: GetMessageProps) => {
    return axiosClient.post("/message/get_message_in_channel", {
      params: params,
    })
  },

  getCountUnreadMessageChannel: (token: string) => {
    return axiosClient.post(
      "/information_channel/count_unread_message_channel",
      {
        params: { token },
      }
    )
  },
}

export default chatApi
