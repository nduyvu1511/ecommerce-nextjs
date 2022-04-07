import { createAsyncThunk } from "@reduxjs/toolkit"
import {
  CreateChannelProps,
  GetMessageProps,
  SearchChannelProps,
  SendMessageProps,
  Token
} from "@/models"
import chatApi from "@/services/chatApi"

export const fetchGetMessagesInChannel = createAsyncThunk(
  "chat/fetchGetMessagesInChannel",
  async (params: GetMessageProps) => {
    try {
      return await chatApi.getMessagesInChannel(params)
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchCreateChannel = createAsyncThunk(
  "chat/fetchCreateChannel",
  async (params: CreateChannelProps) => {
    try {
      return await chatApi.createChannel(params)
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchSendMessage = createAsyncThunk(
  "chat/fetchSendMessage",
  async (params: SendMessageProps) => {
    try {
      return await chatApi.sendMessage(params)
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchGetChannels = createAsyncThunk(
  "chat/fetchGetChannels",
  async (params: Token) => {
    try {
      return await chatApi.getChannels(params)
    } catch (error) {
      console.log(error)
    }
  }
)

export const fetchSearchChannel = createAsyncThunk(
  "chat/fetchSearchChannel",
  async (params: SearchChannelProps) => {
    try {
      return await chatApi.searchChannel(params)
    } catch (error) {
      console.log(error)
    }
  }
)
