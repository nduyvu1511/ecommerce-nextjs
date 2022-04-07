import { Message } from "@/models"

interface MessageItemProps {
  message: Message
}

export const MessageItem = ({ message }: MessageItemProps) => {
  return (
    <li
      className={`chat__list-item ${
        message.is_author ? "chat__list-item-self" : "chat__list-item-partner"
      }`}
      dangerouslySetInnerHTML={{ __html: message.content }}
    ></li>
  )
}
