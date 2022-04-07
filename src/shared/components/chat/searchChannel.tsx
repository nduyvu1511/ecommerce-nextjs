import { useEffect, useRef, useState } from "react"
import { IoIosClose } from "react-icons/io"
import { RiSearchLine } from "react-icons/ri"

import chatApi from "../../../services/chatApi"
import { emptyImg } from "../../assets"
import { isArrayHasValue } from "../../helper/functions"
import useDebounce from "../../hook/useDebounce"
// import socket from '../../../core/config/chat';

interface SearchChannelProps {
  setExpandChatBox: Function
}

export const SearchChannel = ({ setExpandChatBox }: SearchChannelProps) => {
  const [openSearchResult, setOpenSearchResult] = useState<boolean>()

  // const {
  //   token,
  //   userInfo: { partner_id },
  // } = useSelector((state: RootState) => state.user)
  // const {
  //   search: { data: channelSearchList },
  // } = useSelector((state: RootState) => state.chat)

  // const [val, setVal] = useState<string>()
  // const firstRef = useRef<boolean>(false)
  // const value = useDebounce(val, 300)

  // useEffect(() => {
  //   if (firstRef.current) {
  //     if (!value) {
  //       dispatch(setSearchChannel())
  //       return
  //     }

  //     dispatch(fetchSearchChannel({ token, channel_name: value }))
  //   } else {
  //     firstRef.current = true
  //   }
  // }, [value])

  // const handleSearchGroup = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const value = e.target.value
  //   setVal(value)

  //   if (value) {
  //     !openSearchResult && setOpenSearchResult(true)
  //   } else {
  //     setOpenSearchResult(false)
  //   }
  // }

  // const handleClickChannelItem = (item: ChannelSearch) => {
  //   if (item.channel_id) {
  //     // socket.emit('join_channel', item.channel_id);
  //     dispatch(
  //       fetchGetMessagesInChannel({
  //         token,
  //         channel_id: item.channel_id,
  //       })
  //     )
  //   } else {
  //     chatApi
  //       .createChannel({
  //         token,
  //         channel_name: item.channel_name,
  //         channel_image: item.channel_image,
  //         partner_ids: [item.partner_id, partner_id],
  //       })
  //       .then((res) => {
  //         const result = res.data.result
  //         if (result.success) {
  //           dispatch(
  //             fetchGetMessagesInChannel({
  //               token,
  //               channel_id: result.data.channel_id,
  //             })
  //           )
  //           // socket.emit('join_channel', result.data.channel_id);
  //         }
  //       })
  //   }

  //   setExpandChatBox && setExpandChatBox()
  //   setOpenSearchResult(false)
  //   setVal("")
  // }

  return (
    <div className="chat__body-right-header-search">
      <RiSearchLine />
      {/* <input
        value={val}
        onChange={handleSearchGroup}
        placeholder="Tìm kiếm theo nhân viên"
        type="text"
        className="chat__item-input"
        style={{ paddingRight: `${openSearchResult ? "2.4rem" : "0"}` }}
      />

      {val ? (
        <button
          onClick={() => {
            setOpenSearchResult(false)
            setVal("")
          }}
          className="btn-reset"
        >
          <IoIosClose />
        </button>
      ) : null}
      {console.log(channelSearchList)}
      {openSearchResult ? (
        <div className="search__channel-result">
          {isArrayHasValue(channelSearchList) ? (
            <ul className="search__channel-result-list">
              {channelSearchList.length > 0 &&
                channelSearchList.map((item, index) => (
                  <li
                    onClick={() => handleClickChannelItem(item)}
                    key={index}
                    className="search__channel-result-list-item"
                  >
                    <img
                      src={`data:image/jpeg;charset=utf-8;base64,${item.channel_image}`}
                      alt=""
                    />
                    <p>{item.channel_name}</p>
                  </li>
                ))}
            </ul>
          ) : (
            <div className="search__channel-result-no-result">
              <img src={emptyImg} alt="" />
              <p>Không tìm thấy cuộc hội thoại nào.</p>
            </div>
          )}
        </div>
      ) : null} */}
    </div>
  )
}
