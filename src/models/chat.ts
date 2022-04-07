import { Token } from "./user"

export interface SearchChannelProps extends Token {
  channel_name: string
}

export interface GetMessageProps extends Token {
  channel_id: number
}

export interface CreateChannelProps extends SearchChannelProps {
  partner_ids: Array<number>
  channel_image?: string
}

export interface Channel {
  channel_id: 8
  channel_name: string
  channel_type: string
  channel_image: string
  channel_partner_ids: Array<number>
  message_unread_counter: number
  last_message: {
    message_id: number
    author_id: number
    author_name: string
    author_avatar: string
    content: string
    create_date: string
    time_duration: string
    is_attachment: boolean
  }
}

export interface SendMessageProps extends Token {
  channel_id: number
  content: string
}

export interface ChannelSearch {
  channel_id: number
  partner_id: number
  channel_name: string
  channel_image: string
}

export interface Message {
  message_id: number
  is_author: boolean
  author_id: number
  author_avatar: string
  content: string
}

export interface MessagesInChannel {
  channel_id: number
  channel_name: string
  channel_image: string
  channel_messages: Message[]
}

export interface ChatSliceProps {
  channel: {
    data: Channel[]
    isLoading: boolean
  }
  messageInChannel: {
    isLoading: boolean
    data: MessagesInChannel
  }
  search: {
    isLoading: boolean
    data: ChannelSearch[]
    initData: ChannelSearch[]
  }
  currentChannelIdActive: number
}
