/* eslint-disable @next/next/no-img-element */
import { DOMAIN_URL } from "@/services"
import React from "react"
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi"
import { MdOutlineClose } from "react-icons/md"
import { RiCloseLine } from "react-icons/ri"
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch"

interface ImageShowProps {
  url: string
  onClose: Function
}

const ImageShow = ({ url, onClose }: ImageShowProps) => {
  return (
    <div className="image__show">
      <div className="image__show-container">
        <TransformWrapper
          initialScale={1}
          initialPositionX={0}
          initialPositionY={0}
        >
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <React.Fragment>
              <div className="tools">
                <button onClick={() => zoomIn()}>
                  <HiOutlinePlusSm />
                </button>
                <button onClick={() => zoomOut()}>
                  {" "}
                  <HiOutlineMinusSm />
                </button>
                <button onClick={() => resetTransform()}>
                  <RiCloseLine />
                </button>
              </div>
              <TransformComponent>
                <img src={`${DOMAIN_URL}${url}`} alt="test" />
              </TransformComponent>
            </React.Fragment>
          )}
        </TransformWrapper>
      </div>
      <div onClick={() => onClose && onClose()} className="image__show-overlay">
        <MdOutlineClose className="image__show-overlay-icon" />
      </div>
    </div>
  )
}

export default ImageShow
