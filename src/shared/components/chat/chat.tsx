import { messageIcon } from "@/assets"
import { clearMessageInChannel } from "@/modules"
import { useEffect, useState } from "react"
import { IoClose } from "react-icons/io5"
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from "react-icons/md"
import { useDispatch, useSelector } from "react-redux"

import chatApi from "../../../services/chatApi"
import { isObjectHasValue } from "../../helper/functions"
import Channel from "./channel"
import Message from "./message"

export const Chat = () => {
  const dispatch = useDispatch()
  const token = localStorage.getItem("access_token")
  const [isClearMessage, setClearMessage] = useState<boolean>()

  // useEffect(() => {
  //   socket.on("receive_message", (data: any) => {
  //     console.log(data)
  //   })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [socket])

  // const {
  //   messageInChannel: { data: message },
  //   channel: { data: channelList },
  // } = useSelector((state: RootState) => state.chat)

  // const { chatboxOpen, expandChatbox, channelGroupOpen } = useSelector(
  //   (state: RootState) => state.modal
  // )

  // useEffect(() => {
  //   if (!token) return
  //   dispatch(fetchGetChannels({ token }))
  // }, [])

  // const handleSendMessage = async (messageValue: string) => {
  //   if (!messageValue || !isObjectHasValue(message)) return

  //   const messageData = {
  //     channel_id: message.channel_id,
  //     message: messageValue,
  //     time: new Date(Date.now()),
  //     token,
  //   }

  //   await socket.emit("send_message", messageData)

  //   chatApi
  //     .sendMessage({
  //       channel_id: message.channel_id,
  //       content: messageValue,
  //       token,
  //     })
  //     .then((res) => {
  //       if (res.data.result.success) {
  //         setClearMessage(true)
  //         dispatch(
  //           fetchGetMessagesInChannel({ channel_id: message.channel_id, token })
  //         )
  //       }
  //     })
  // }

  // const handleOpenChatBox = () => {
  //   dispatch(toggleChatboxOpen(true))
  //   dispatch(toggleExpandChatbox(true))

  //   if (isObjectHasValue(message)) {
  //     dispatch(
  //       fetchGetMessagesInChannel({ channel_id: message.channel_id, token })
  //     )
  //   } else {
  //     dispatch(toggleOpenChannelGroup(true))
  //   }
  // }

  // const handleClickChannelItem = (channel_id: number) => {
  //   setClearMessage(false)

  //   if (channelGroupOpen) {
  //     dispatch(toggleOpenChannelGroup(false))
  //   }

  //   if (!expandChatbox) {
  //     dispatch(toggleExpandChatbox(true))
  //   }

  //   if (message.channel_id !== channel_id) {
  //     dispatch(fetchGetMessagesInChannel({ token, channel_id }))
  //     dispatch(clearMessageInChannel())
  //   }
  // }

  if (!token) return null

  return <>{/* Button open Chat */}</>
}

{
  //   !chatboxOpen ? (
  //     <>
  //       <button
  //         onClick={handleOpenChatBox}
  //         className="chat__btn chat__btn-lg btn-reset"
  //       >
  //         <span className="chat__btn-count">{channelList.length}</span>
  //         {messageIcon}
  //         Chat
  //       </button>
  //       <button
  //         onClick={handleOpenChatBox}
  //         className="chat__btn chat__btn-sm btn-reset"
  //       >
  //         <span className="chat__btn-count">{channelList.length}</span>
  //         {messageIcon}
  //       </button>
  //     </>
  //   ) : null
  // }
  // ;<div
  //   className={`chat__container ${chatboxOpen ? "chat__container-active" : ""}`}
  // >
  //   {chatboxOpen ? (
  //     <div className={`chat ${expandChatbox ? "chat-expanded" : ""}`}>
  //       <header className="chat__header">
  //         <p className="chat__header-title">
  //           Chat
  //           <span>({channelList.length})</span>
  //         </p>
  //         <div className="chat__header-buttons">
  //           {/* Show on Mobile */}
  //           <button
  //             onClick={() => dispatch(toggleOpenChannelGroup(!channelGroupOpen))}
  //             className="btn-reset show-on-mobile"
  //           >
  //             <MdOutlineKeyboardArrowLeft />
  //           </button>
  //           <button
  //             onClick={() => dispatch(toggleChatboxOpen(false))}
  //             className="btn-reset show-on-mobile"
  //           >
  //             <IoClose />
  //           </button>
  //           {/* Show on desktop */}
  //           <button
  //             style={{ marginRight: "1rem" }}
  //             onClick={() => dispatch(toggleExpandChatbox(!expandChatbox))}
  //             className="btn-reset show-on-desktop"
  //           >
  //             {expandChatbox ? (
  //               <MdOutlineKeyboardArrowRight />
  //             ) : (
  //               <MdOutlineKeyboardArrowLeft />
  //             )}
  //           </button>
  //           <button
  //             onClick={() => dispatch(toggleChatboxOpen(false))}
  //             className="btn-reset show-on-desktop"
  //           >
  //             <MdOutlineKeyboardArrowDown />
  //           </button>
  //         </div>
  //       </header>
  //       <div className="chat__body">
  //         <div
  //           className={`chat__body-left ${
  //             expandChatbox ? "chat__body-left-active" : ""
  //           }`}
  //         >
  //           <Message
  //             clearMessage={() => setClearMessage(false)}
  //             isClearMessage={isClearMessage}
  //             handleSubmit={(str: string) => handleSendMessage(str)}
  //           />
  //         </div>
  //         <div
  //           className={`chat__body-right ${
  //             channelGroupOpen ? "chat__body-right-open" : ""
  //           }`}
  //         >
  //           <Channel handleClick={(id: number) => handleClickChannelItem(id)} />
  //         </div>
  //       </div>
  //     </div>
  //   ) : null}
  // </div>
}
