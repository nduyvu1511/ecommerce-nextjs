import { RootState } from "@/core/store"
import { isObjectHasValue } from "@/helper"
import { Channel, ChannelSearch } from "@/models"
import { addMessage, setMessageLoading, setMessages } from "@/modules"
import chatApi from "@/services/chatApi"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import useSWR, { mutate } from "swr"

interface ChannelSearchProps {
  isLoading: boolean | undefined
  channels: ChannelSearch[]
}

interface CreateChannelParams {
  channel: {
    channel_name: string
    partner_ids: number[]
    channel_image?: string
  }
  handleSuccess: Function
  handleError?: Function
}

interface ChatRes {
  data: Channel[]
  error: any
  isValidating: boolean
  getMessagesInChannel: (id: number) => void
  channelSearch: ChannelSearchProps
  searchChannel: (val: string) => void
  sendMessage: (
    val: string,
    channel_id: number,
    handlSuccess: Function,
    handleError?: Function
  ) => void
  createChannel: (params: CreateChannelParams) => void
  clearSearchChannelLoading: Function
}

const useChat = (shouldFetch = true): ChatRes => {
  const dispatch = useDispatch()
  const { token, userInfo: { id: user_id = 0 } = { userInfo: undefined } } =
    useSelector((state: RootState) => state.user)
  const [channelSearch, setCurrentChannelSearch] = useState<ChannelSearchProps>(
    {
      channels: [],
      isLoading: undefined,
    }
  )

  const { data, error, isValidating } = useSWR(
    "chat",
    shouldFetch && token
      ? () =>
          chatApi
            .getChannels({ token })
            .then((res: any) => res?.result?.data || [])
      : null,
    { revalidateOnFocus: false, dedupingInterval: 12000 }
  )

  const getMessagesInChannel = async (channel_id: number) => {
    if (!token) return

    try {
      dispatch(setMessageLoading(true))
      const res: any = await chatApi.getMessagesInChannel({ channel_id, token })
      dispatch(setMessageLoading(false))
      dispatch(setMessages(res?.result?.data?.channel_messages || []))
    } catch (error) {
      dispatch(setMessageLoading(false))
    }
  }

  const clearSearchChannelLoading = () => {
    setCurrentChannelSearch({ channels: [], isLoading: undefined })
  }

  const searchChannel = async (channel_name: string) => {
    if (!token) return
    setCurrentChannelSearch({
      channels: [],
      isLoading: true,
    })
    try {
      const res: any = await chatApi.searchChannel({ channel_name, token })
      if (res?.result?.success) {
        setCurrentChannelSearch({
          channels: res?.result?.data || [],
          isLoading: false,
        })
      } else {
        setCurrentChannelSearch({ channels: [], isLoading: false })
      }
    } catch (error) {
      setCurrentChannelSearch({ channels: [], isLoading: false })
    }
  }

  const sendMessage = async (
    content: string,
    channel_id: number,
    handleSuccess: Function,
    handleError?: Function
  ) => {
    if (!token) return
    if (!content) return

    try {
      const res: any = await chatApi.sendMessage({ channel_id, content, token })
      if (res?.result?.success) {
        handleSuccess()
        dispatch(
          addMessage({
            author_avatar: "",
            author_id: user_id,
            content,
            is_author: true,
            message_id: 1,
          })
        )
      } else {
        handleError && handleError()
      }
    } catch (error) {
      console.log(error)
      handleError && handleError()
    }
  }

  const createChannel = async (params: CreateChannelParams) => {
    if (!token) return
    const {
      channel: { channel_name, partner_ids, channel_image = "" },
      handleSuccess,
      handleError,
    } = params
    try {
      const res: any = await chatApi.createChannel({
        channel_name,
        partner_ids: [...partner_ids, user_id],
        token,
        channel_image,
      })

      if (res?.result?.success) {
        if (!isObjectHasValue(res?.result?.data)) return
        const channel: Channel = res.result.data
        mutate([channel, ...data], false)
        handleSuccess(res.result.data)
      } else {
        handleError && handleError()
      }
    } catch (error) {
      handleError && handleError()
    }
  }

  return {
    data,
    error,
    isValidating,
    getMessagesInChannel,
    channelSearch,
    searchChannel,
    sendMessage,
    createChannel,
    clearSearchChannelLoading,
  }
}

export { useChat }
