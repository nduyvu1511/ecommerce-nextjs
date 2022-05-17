import { Channel } from "@/models"
import moment from "moment"
import Image from "next/image"
import React from "react"

interface ChannelItemProps {
  channel: Channel
  onClick?: (channel: Channel) => void
  active?: boolean
  type: "channel" | "message"
}

export const ChannelItem = ({
  channel,
  onClick,
  active,
  type,
}: ChannelItemProps) => {
  return (
    <div
      onClick={() => onClick && onClick(channel)}
      className={`chat__channel-item ${
        active ? "chat__channel-item-active" : ""
      }`}
    >
      <div
        className={`image-container chat__channel-item-avatar ${
          type === "message" ? "chat__channel-item-avatar-sm" : ""
        }`}
      >
        <Image
          src={`data:image/png;base64,${channel.channel_image}`}
          alt=""
          layout="fill"
          objectFit="cover"
        />

        {type === "channel" && channel.message_unread_counter > 0 ? (
          <span className="chat__channel-item-count">
            {channel.message_unread_counter > 9
              ? "9+"
              : channel.message_unread_counter}
          </span>
        ) : null}

        <span className="chat__channel-item-status"></span>
      </div>

      <div className="chat__channel-item-info">
        <p
          className={`chat__channel-item-info-name ${
            type === "message" ? "chat__channel-item-info-name-lg" : ""
          }`}
        >
          {channel.channel_name}
        </p>
        {type === "channel" ? (
          <div className="chat__channel-item-info-bottom">
            <p
              className="chat__channel-item-info-msg"
              dangerouslySetInnerHTML={{
                __html: channel?.last_message?.content || "",
              }}
            ></p>
            <p className="chat__channel-item-info-date">
              {channel?.last_message?.time_duration}
            </p>
          </div>
        ) : null}
      </div>
    </div>
  )
}
