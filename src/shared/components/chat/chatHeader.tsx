import Image from "next/image"
import React from "react"

const chatHeader = () => {
  return (
    <header className="chat__header">
      {/* <div className="chat__header-info">
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
      </div> */}
    </header>
  )
}

export default chatHeader
