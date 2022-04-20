import { toggleModalConfirm } from "@/modules"
import { ReactNode, useEffect } from "react"
import { RiCloseFill } from "react-icons/ri"
import { useDispatch } from "react-redux"

export interface IModal {
  children?: ReactNode
  isShowModal: Boolean
  handleClickModal: Function
  direction: "left" | "right" | "center"
  stack?: boolean
  unsetSize?: boolean
  isShowConfirmModal?: boolean
  heading?: string
  disableOverLay?: boolean
  fullWidth?: boolean
  preventScrolling?: boolean
}

export const Modal = ({
  children,
  isShowModal,
  handleClickModal,
  direction,
  stack,
  unsetSize,
  heading,
  isShowConfirmModal,
  fullWidth,
  disableOverLay = false,
  preventScrolling = false,
}: IModal) => {
  const dispatch = useDispatch()

  useEffect(() => {
    if (!preventScrolling) return

    const htmlTag = document.querySelector("html")
    if (htmlTag) {
      htmlTag.style.overflow = "hidden"
    }
    return () => {
      if (htmlTag) {
        htmlTag.style.overflow = "auto"
      }
    }
  }, [])

  const handleClick = () => {
    handleClickModal && handleClickModal()
  }

  const closeModalHandler = () => {
    isShowConfirmModal ? dispatch(toggleModalConfirm(true)) : handleClick()
  }

  return (
    <>
      <section
        className={`modal modal-${direction} ${
          isShowModal ? "modal-active" : ""
        } ${stack ? "modal-stack" : ""} ${unsetSize ? "modal-size-auto" : ""} ${
          fullWidth ? "modal-full" : ""
        }`}
      >
        {heading ? (
          <header className="modal__header">
            <h3 className="modal__header-heading">{heading}</h3>
            <button onClick={closeModalHandler} className="btn-reset">
              <RiCloseFill />
            </button>
          </header>
        ) : null}
        {children}
      </section>

      <div
        onClick={() => !disableOverLay && closeModalHandler()}
        className={`overlay ${isShowModal ? "overlay-active" : ""} ${
          stack ? "overlay-stack" : ""
        } ${isShowConfirmModal || disableOverLay ? "overlay-disabled" : ""} `}
      ></div>
    </>
  )
}
