import { toggleModalConfirm } from "@/modules"
import { ReactNode } from "react"
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
}: IModal) => {
  const dispatch = useDispatch()

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
        } ${stack ? "modal-stack" : ""} ${unsetSize ? "modal-size-auto" : ""} `}
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
        onClick={closeModalHandler}
        className={`overlay ${isShowModal ? "overlay-active" : ""} ${
          stack ? "overlay-stack" : ""
        } ${isShowConfirmModal ? "disabled" : ""} `}
      ></div>
    </>
  )
}
