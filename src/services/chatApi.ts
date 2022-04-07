import axios from "axios"
import {
  CreateChannelProps,
  GetMessageProps,
  SearchChannelProps,
  SendMessageProps,
  Token,
} from "@/models"

const chatApi = {
  getChannels: (token: Token) => {
    return axios.post("/information_channel/get_channel", {
      params: token,
    })
  },

  searchChannel: (params: SearchChannelProps) => {
    return axios.post("/information_channel/search_channel", {
      params: params,
    })
  },

  createChannel: (params: CreateChannelProps) => {
    return axios.post("/information_channel/create_group_channel", {
      params: params,
    })
  },

  sendMessage: (params: SendMessageProps) => {
    return axios.post("/message/send_message", {
      params: params,
    })
  },

  getMessagesInChannel: (params: GetMessageProps) => {
    return axios.post("/message/get_message_in_channel", {
      params: params,
    })
  },
}

export default chatApi
