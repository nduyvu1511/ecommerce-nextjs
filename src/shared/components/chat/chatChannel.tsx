import { cartEmptyIcon } from "@/assets"
import { RootState } from "@/core/store"
import { convertViToEn } from "@/helper"
import { Channel, ChannelSearch } from "@/models"
import { setCurrentChannel } from "@/modules"
import Image from "next/image"
import { useEffect } from "react"
import { FiSearch } from "react-icons/fi"
import { IoIosCloseCircle } from "react-icons/io"
import { RiLoader4Line } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { useDebounce, useInputText } from "shared/hook"
import { useChat } from "shared/hook/useChat"
import { ChannelItem } from "./channelItem"

export const ChatChannel = () => {
  const dispatch = useDispatch()
  const { onChange, value, clearValue } = useInputText("")
  const val = useDebounce(value, 400)
  const {
    isValidating,
    data: channels,
    getMessagesInChannel,
    searchChannel,
    createChannel,
    channelSearch: { channels: channelsSearch = [], isLoading: isSeachLoading },
    clearSearchChannelLoading,
  } = useChat()
  const { currentChannel } = useSelector((state: RootState) => state.chat)

  const handleSelectChannel = (channel: Channel) => {
    if (currentChannel?.channel_id === channel.channel_id) return

    getMessagesInChannel(channel.channel_id)
    dispatch(setCurrentChannel(channel))
  }

  const handleCreateChannel = (channel: ChannelSearch) => {
    const newChannel: Channel | undefined = channels?.find(
      (item) => item.channel_id === channel.channel_id
    )
    if (newChannel) {
      handleSelectChannel(newChannel)
      clearValue()
      clearSearchChannelLoading()
    } else {
      createChannel({
        channel: {
          channel_name: channel.channel_name,
          partner_ids: [channel.channel_id],
          channel_image: channel.channel_image,
        },
        handleSuccess: (channel: Channel) => {
          handleSelectChannel(channel)
          clearValue()
          clearSearchChannelLoading()
        },
      })
    }
  }

  useEffect(() => {
    if (!val) return
    searchChannel(convertViToEn(val))
  }, [val])

  return (
    <div className="chat__channel">
      <div className="chat__channel-search">
        <div className="chat__channel-search-input">
          <FiSearch className="chat__channel-search-input-icon" />
          <input
            type="text"
            value={value}
            onChange={onChange}
            placeholder="Tìm theo tên người dùng..."
          />
          {value ? (
            <button
              onClick={() => clearValue()}
              className="btn-reset chat__channel-search-close-btn"
            >
              <IoIosCloseCircle />
            </button>
          ) : null}
        </div>

        {/* Chat search channel result */}
        {value ? (
          <div className="chat__channel-search-result">
            {isSeachLoading === true ? (
              <div className="loader-container">
                <RiLoader4Line className="loader" />
              </div>
            ) : null}

            {isSeachLoading === false && channelsSearch?.length > 0 ? (
              <ul className="chat__result-list">
                {channelsSearch.map((item, index) => (
                  <li
                    onClick={() => handleCreateChannel(item)}
                    key={index}
                    className="chat__result-list-item"
                  >
                    <div className="image-container chat__result-list-item-image">
                      <Image
                        objectFit="cover"
                        src={`data:image/png;base64,${item.channel_image}`}
                        alt={item.channel_name}
                        layout="fill"
                      />
                    </div>

                    <p className="chat__result-list-item-name">
                      {item.channel_name}
                    </p>
                  </li>
                ))}
              </ul>
            ) : null}

            {isSeachLoading === false && channelsSearch?.length === 0 ? (
              <div className="chat__result--no-result">
                {cartEmptyIcon}
                <p>Không tìm thấy cuộc hội thoại nào</p>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>

      <div className="chat__channel-body">
        {!isValidating && channels?.length > 0 ? (
          <ul className="chat__channel-list">
            {channels.map((channel, index) => (
              <li key={index} className="chat__channel-list-item">
                <ChannelItem
                  type="channel"
                  onClick={(channel) => handleSelectChannel(channel)}
                  channel={channel}
                  active={currentChannel?.channel_id === channel.channel_id}
                />
              </li>
            ))}
          </ul>
        ) : null}

        {isValidating ? (
          <div className="loader-container">
            <RiLoader4Line className="loader" />
          </div>
        ) : null}
      </div>
    </div>
  )
}
