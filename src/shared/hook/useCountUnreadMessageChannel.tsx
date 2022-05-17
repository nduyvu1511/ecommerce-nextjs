import { RootState } from "@/core/store"
import { Channel } from "@/models"
import { setMessageUnreadCount } from "@/modules"
import chatApi from "@/services/chatApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface Response {
  data: Channel[]
  error: any
  isValidating: boolean
}

const useCountUnreadMessageChannel = (shouldFetch = true): Response => {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user)
  const { data, error, isValidating } = useSWR(
    "chat_count",
    shouldFetch && token
      ? () =>
          chatApi.getCountUnreadMessageChannel(token).then((res: any) => {
            const messageCount =
              res?.result?.data?.count_unread_message_channel || 0
            dispatch(setMessageUnreadCount(messageCount))
            return messageCount
          })
      : null,
    { revalidateOnFocus: false, dedupingInterval: 12000 }
  )

  return {
    data,
    error,
    isValidating,
  }
}

export { useCountUnreadMessageChannel }
