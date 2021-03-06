import { RootState } from "@/core/store"
import { setModalConfirm } from "@/modules"
import { useEffect } from "react"
import { TiWarning } from "react-icons/ti"
import { useDispatch, useSelector } from "react-redux"

interface ModalConfirmProps {
  onConfirm?: Function
}
export const ModalConfirm = ({ onConfirm }: ModalConfirmProps) => {
  const language = "vni"
  const dispatch = useDispatch()
  const {
    modalConfirm: { isOpen, title, heading },
  } = useSelector((state: RootState) => state.common)

  useEffect(() => {
    if (!isOpen) return

    const htmlTag = document.querySelector("html")
    if (htmlTag) {
      htmlTag.style.overflow = "hidden"
    }

    return () => {
      if (htmlTag) {
        htmlTag.style.overflow = "unset"
      }
    }
  }, [])

  const handleCloseModal = () => {
    dispatch(setModalConfirm())
  }

  const handleConfirmModal = () => {
    if (!onConfirm) {
      dispatch(setModalConfirm())
    } else {
      onConfirm()
      dispatch(setModalConfirm())
    }
  }

  return (
    <>
      {isOpen ? (
        <>
          <section className="modal__confirm-container">
            <div className="modal__confirm">
              <header className="modal__confirm-header">
                <span className="modal__confirm-header-icon">
                  <TiWarning />
                </span>
                <h3 className="modal__confirm-header-heading">
                  {language === "vni" ? "Bạn có chắc chắn?" : "Are you sure?"}
                </h3>
              </header>
              <div className="modal__confirm-body">
                <p className="modal__confirm-body-desc">{title}</p>
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
        ${isOpen ? "modal__confirm-overlay-active" : ""}
        `}
          ></div>
        </>
      ) : null}
    </>
  )
}
