import { messageIcon } from "@/assets"
import { ChatDesktop, ChatMobile } from "@/components"
import { RootState } from "@/core/store"
import { toggleOpenChatDesktop } from "@/modules"
import React from "react"
import { useDispatch, useSelector } from "react-redux"
import { useCountUnreadMessageChannel } from "shared/hook"

const ChatContainer = () => {
  const dispatch = useDispatch()
  const {
    isExpandChatModal,
    isOpenChatDesktop,
    currentChannel,
    isOpenChatMobile,
  } = useSelector((state: RootState) => state.chat)

  const { data: messageUnreadCount = 0 } = useCountUnreadMessageChannel(true)

  return (
    <section className="chat-container">
      <button
        onClick={() => dispatch(toggleOpenChatDesktop(true))}
        className="chat-btn"
      >
        {messageIcon}Chat
        <span className="chat-btn-count">{messageUnreadCount}</span>
      </button>

      {isOpenChatDesktop ? (
        <div
          className={`chat__modal ${
            currentChannel?.channel_id ? "chat__modal-expand" : ""
          } ${isExpandChatModal ? "chat__modal-full" : ""}`}
        >
          <ChatDesktop />
        </div>
      ) : null}

      {isOpenChatMobile ? <ChatMobile /> : null}
    </section>
  )
}

export default ChatContainer
