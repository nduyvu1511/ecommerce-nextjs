import { RootState } from "@/core/store"
import { toggleModalConfirm } from "@/modules"
import { useEffect } from "react"
import { RiCloseFill } from "react-icons/ri"
import { VscChromeClose } from "react-icons/vsc"
import { useDispatch, useSelector } from "react-redux"

interface ModalConfirmProps {
  desc: string
  confirmModal: Function
}
export const ModalConfirm = ({ desc, confirmModal }: ModalConfirmProps) => {
  const language = "vni"
  const dispatch = useDispatch()
  const { isOpenModalConfirm } = useSelector((state: RootState) => state.common)

  useEffect(() => {
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

  const handleCloseModal = () => {
    dispatch(toggleModalConfirm(!isOpenModalConfirm))
  }

  const handleConfirmModal = () => {
    confirmModal && confirmModal()
    dispatch(toggleModalConfirm(false))
  }

  return (
    <>
      <section
        className={`modal__confirm-container 
          ${isOpenModalConfirm ? "modal__confirm-container-active" : ""}
         `}
      >
        <div className="modal__confirm">
          <header className="modal__confirm-header">
            <button
              onClick={handleCloseModal}
              className="btn-reset modal__confirm-header-close-btn"
            >
              <RiCloseFill />
            </button>
          </header>
          <div className="modal__confirm-body">
            <span className="modal__confirm-body-icon">
              <VscChromeClose />
            </span>
            <h3 className="modal__confirm-body-heading">
              {language === "vni" ? "Bạn có chắc chắn?" : "Are you sure?"}
            </h3>
            <p className="modal__confirm-body-desc">{desc}</p>
          </div>
          <footer className="modal__confirm-footer">
            <button
              onClick={handleCloseModal}
              className="btn-primary modal__confirm-footer-btn modal__confirm-footer-btn-cancel"
            >
              {language === "vni" ? "Hủy" : "Hủy"}
            </button>
            <button
              onClick={handleConfirmModal}
              className="btn-primary modal__confirm-footer-btn modal__confirm-footer-btn-delete"
            >
              {language === "vni" ? "Xác nhận" : "Xác nhận"}
            </button>
          </footer>
        </div>
      </section>

      <div
        className={`modal__confirm-overlay 
        ${isOpenModalConfirm ? "modal__confirm-overlay-active" : ""}
        `}
      ></div>
    </>
  )
}
