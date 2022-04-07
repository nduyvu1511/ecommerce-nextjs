import { Channel } from "@/models"

interface ChannelItemProps {
  channel: Channel
  onClick: Function
  isActive?: boolean
}

export const ChannelItem = ({
  channel,
  onClick,
  isActive,
}: ChannelItemProps) => {
  return (
    <li
      onClick={() => onClick && onClick(channel.channel_id)}
      key={channel.channel_id}
      className={`chat__body-group__list-item ${
        isActive ? "chat__body-group__list-item-active" : ""
      }`}
    >
      <img
        src={`data:image/jpeg;charset=utf-8;base64,${channel.channel_image}`}
        alt=""
      />
      <div className="chat__body-group__list-item-info">
        <p>
          <span className="channel__item-name">{channel.channel_name}</span>
          {channel.message_unread_counter ? (
            <span className="channel__item-count">
              {channel.message_unread_counter > 99
                ? "99+"
                : channel.message_unread_counter}
            </span>
          ) : null}
        </p>
        <p>
          <span>{channel.last_message?.content}</span>
          <span>{channel.last_message?.create_date}</span>
        </p>
      </div>
    </li>
  )
}
