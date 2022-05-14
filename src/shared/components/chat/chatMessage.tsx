import { RootState } from "@/core/store"
import Image from "next/image"
import React, { useEffect, useRef } from "react"
import { useState } from "react"
import { RiLoader4Line } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useChat } from "shared/hook"
import { ChannelItem } from "./channelItem"
import { ChatForm } from "./chatForm"

interface ChatMessageProps {
  showHeader?: boolean
}

export const ChatMessage = ({ showHeader = true }: ChatMessageProps) => {
  const { sendMessage } = useChat(false)
  const chatRef = useRef<HTMLLIElement>(null)
  const { currentChannel, messages, isMessageLoading } = useSelector(
    (state: RootState) => state.chat
  )

  const [isSending, setSending] = useState<boolean>()

  useEffect(() => {
    chatRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (val: string) => {
    setSending(true)
    if (!val || isSending || !currentChannel?.channel_id) return
    sendMessage(
      val,
      currentChannel.channel_id,
      () => {
        setSending(false)
      },
      () => {
        setSending(false)
      }
    )
  }

  return (
    <div className="chat__message">
      {currentChannel && showHeader ? (
        <div className="chat__message-channel">
          <ChannelItem type="message" channel={currentChannel} />
        </div>
      ) : null}

      {isMessageLoading ? (
        <div className="loader-container">
          <RiLoader4Line className="loader" />
        </div>
      ) : null}

      <div className="chat__message-body">
        <ul className="chat__message-list">
          {!isMessageLoading && messages && messages?.length > 0 ? (
            <>
              {messages.map((item, index) => {
                const prevMessage = messages[index - 1]
                const nextMessage = messages[index + 1]
                const isBreak =
                  !prevMessage || prevMessage?.author_id !== item.author_id
                const isLast =
                  !nextMessage || nextMessage?.author_id !== item.author_id

                return (
                  <li ref={chatRef} key={index} className="chat__message-item">
                    {isBreak ? (
                      <>
                        {index > 0 ? <br /> : null}
                        {!item.is_author ? (
                          <div className="image-container chat__message-item-avatar">
                            <Image
                              quality={40}
                              src={`data:image/png;base64,${item.author_avatar}`}
                              layout="fill"
                              alt=""
                            />
                          </div>
                        ) : null}
                      </>
                    ) : null}

                    <div
                      className={`chat__message-item-text ${
                        item.is_author
                          ? "chat__message-item-text-self"
                          : "chat__message-item-text-partner"
                      } `}
                    >
                      <div
                        className=""
                        dangerouslySetInnerHTML={{
                          __html: item?.content || "",
                        }}
                      ></div>

                      {isLast ? (
                        <p className="chat__message-item-text-date">
                          1 giờ trước
                        </p>
                      ) : null}
                    </div>
                  </li>
                )
              })}
            </>
          ) : null}
        </ul>
      </div>

      <div className="chat__message-form">
        <ChatForm
          isSending={isSending}
          onSubmit={(val) => handleSendMessage(val)}
        />
      </div>
    </div>
  )
}
