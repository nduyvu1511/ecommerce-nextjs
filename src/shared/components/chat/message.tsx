import { memo, useEffect, useRef, useState } from "react"
import { FaRegSmileWink } from "react-icons/fa"
import { MdSend } from "react-icons/md"
import { RiLoader4Fill } from "react-icons/ri"

interface MessageProps {
  handleSubmit: Function
  isClearMessage?: boolean
  clearMessage?: Function
}

const Message = ({
  handleSubmit,
  isClearMessage,
  clearMessage,
}: MessageProps) => {
  const chatListRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // const {
  //   messageInChannel: { data: message, isLoading: isMessagesInChannelLoading },
  // } = useSelector((state: RootState) => state.chat);

  // const [messageValue, setMessageValue] = useState<string>('');

  // useEffect(() => {
  //   if (isClearMessage) {
  //     setMessageValue('');
  //     clearMessage && clearMessage();
  //   }
  // }, [isClearMessage]);

  // useEffect(() => {
  //   inputRef?.current?.focus();
  //   chatListRef?.current?.scrollIntoView();
  // }, []);

  return (
    // <div className="chat__body-left-wrapper">
    //   {isObjectHasValue(message) ? (
    //     <>
    //       <div className="chat__body-left-name">
    //         <p>{message.channel_name}</p>
    //       </div>

    //       <div className="chat__body-left-content">
    //         <ul className="chat__list">
    //           {/* <p className="chat__list-time">3 Th03, 20:36</p> */}
    //           {isArrayHasValue(message.channel_messages) &&
    //             message.channel_messages.map((item, index) => {
    //               const prevMessage = message.channel_messages[index - 1];
    //               const isBreak =
    //                 !prevMessage || prevMessage?.author_id !== item.author_id;

    //               return (
    //                 <>
    //                   {isBreak ? (
    //                     <>
    //                       {index > 0 ? <br key={index} /> : null}
    //                       <div
    //                         key={index}
    //                         className={`${
    //                           item.is_author
    //                             ? 'chat__list-item-right'
    //                             : 'chat__list-item-left'
    //                         }`}>
    //                         <img
    //                           src={`data:image/jpeg;charset=utf-8;base64,${item.author_avatar}`}
    //                           alt=""
    //                         />
    //                       </div>
    //                     </>
    //                   ) : null}

    //                   <MessageItem key={index} message={item} />
    //                 </>
    //               );
    //             })}
    //         </ul>
    //         <div className="chat__list-bottom" ref={chatListRef}></div>
    //       </div>
    //     </>
    //   ) : isMessagesInChannelLoading ? (
    //     <div className="chat__body-loading">
    //       <RiLoader4Fill className="loader" />
    //     </div>
    //   ) : (
    //     <div className="chat__body-left-empty">
    //       <FaRegSmileWink />
    //       <p>Xin Chào</p>
    //     </div>
    //   )}

    //   {/* Message input */}
    //   {isObjectHasValue(message) ? (
    //     <form
    //       onSubmit={(e) => {
    //         e.preventDefault();
    //         handleSubmit(messageValue);
    //       }}
    //       className="chat__body-left-chat-box">
    //       <input
    //         ref={inputRef}
    //         value={messageValue}
    //         onChange={(e) => setMessageValue(e.target.value)}
    //         placeholder="Gửi tin nhắn"
    //         type="text"
    //         className="chat__item-input chat__body-left-chat-box-input"
    //       />
    //       <button type="submit" className="btn-reset">
    //         <MdSend />
    //       </button>
    //     </form>
    //   ) : null}
    // </div>

    <></>
  )
}

export default memo(Message)
