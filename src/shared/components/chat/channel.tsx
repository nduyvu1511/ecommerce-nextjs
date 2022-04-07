import { memo } from "react"
import { IoClose } from "react-icons/io5"

import { ChannelItem } from "./channelItem"
import { SearchChannel } from "./searchChannel"

interface ChannelProps {
  handleClick: Function
}

const Channel = ({ handleClick }: ChannelProps) => {
  // const {
  //   channel: { data: channelList },
  //   messageInChannel: { data: message, isLoading: isMessagesInChannelLoading },
  // } = useSelector((state: RootState) => state.chat)

  return (
    <div className="chat__body-right-wrapper">
      {/* <header className="chat__body-right-wrapper-header show-on-mobile">
        <button
          onClick={() => dispatch(toggleOpenChannelGroup(false))}
          className="btn-reset"
        >
          <IoClose />
        </button>
      </header>
      <div className="chat__body-right-header">
        <SearchChannel
          setExpandChatBox={() => dispatch(toggleExpandChatbox(true))}
        />
      </div>

      <div className="chat__body-right-body">
        <ul className="chat__body-group__list">
          {channelList.length > 0 &&
            channelList.map((item, index) => (
              <ChannelItem
                key={index}
                isActive={item.channel_id === (message?.channel_id || 0)}
                onClick={(channel_id: number) => {
                  handleClick && handleClick(channel_id)
                }}
                channel={item}
              />
            ))}
        </ul>
      </div> */}
    </div>
  )
}

export default memo(Channel)
