import { popupImg } from "@/assets"
import Image from "next/image"
import { useRouter } from "next/router"
import { RiCloseFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../modal/modal"

export const Popup = () => {
  const dispatch = useDispatch()
  const isOpen = false

  const { pathname } = useRouter()

  const handleClose = () => {
    // dispatch(toggleModalPopup(false))
  }

  return (
    <>
      {isOpen && pathname === "/" ? (
        <div className="popup-container">
          <Modal
            direction="center"
            isShowModal={isOpen}
            handleClickModal={handleClose}
          >
            <div className="popup">
              <button
                onClick={handleClose}
                className="btn-reset popup-close-btn"
              >
                <RiCloseFill />
              </button>
              <Image className="img-fluid" src={popupImg} alt="" />
            </div>
          </Modal>
        </div>
      ) : null}
    </>
  )
}
