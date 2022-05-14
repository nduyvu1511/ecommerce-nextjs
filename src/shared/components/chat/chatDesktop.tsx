import { RootState } from "@/core/store"
import { toggleExpandChatModal, toggleOpenChatDesktop } from "@/modules"
import { API_URL } from "@/services"
import Image from "next/image"
import { CgArrowsExpandRight, CgClose } from "react-icons/cg"
import { useDispatch, useSelector } from "react-redux"
import { ChatChannel } from "./chatChannel"
import { ChatMessage } from "./chatMessage"

export const ChatDesktop = () => {
  const dispatch = useDispatch()
  const { userInfo } = useSelector((state: RootState) => state.user)
  const { isExpandChatModal, currentChannel } = useSelector(
    (state: RootState) => state.chat
  )

  const handleExpandChatModal = () => {
    dispatch(toggleExpandChatModal(!isExpandChatModal))
  }

  return (
    <div className="chat">
      <header className="chat__header">
        <div className="chat__header-info">
          <div className="image-container chat__header-info-avatar">
            <Image
              alt=""
              objectFit="cover"
              src={`${API_URL}${userInfo?.avatar}`}
              layout="fill"
            />
          </div>
          <p className="chat__header-info-name">{userInfo?.name}</p>
        </div>
        <div className="chat__header-actions">
          {currentChannel?.channel_id ? (
            <button
              onClick={() => handleExpandChatModal()}
              className="btn-reset chat__header-actions-expand-btn"
            >
              <CgArrowsExpandRight />
            </button>
          ) : null}

          <button
            onClick={() => dispatch(toggleOpenChatDesktop(false))}
            className="btn-reset chat__header-actions-close-btn"
          >
            <CgClose />
          </button>
        </div>
      </header>

      <div className="chat__body">
        <div className="chat__body-channel">
          <ChatChannel />
        </div>

        {currentChannel?.channel_id ? (
          <div className="chat__body-message">
            <ChatMessage />
          </div>
        ) : null}
      </div>
    </div>
  )
}
