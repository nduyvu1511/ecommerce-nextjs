import { Breadcrumb, Modal, ModalHeading } from "@/components"
import { AccountOption } from "@/container"
import { toggleModalAccountOption } from "@/modules"
import { ReactNode } from "react"
import { RiMenuFill } from "react-icons/ri"
import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../core/store"

interface AccountContainerProps {
  children: ReactNode
  heading: string
}

export const AccountContainer = (props: AccountContainerProps) => {
  const { children, heading } = props

  const dispatch = useDispatch()
  const { isOpenModalOptionAccount } = useSelector(
    (state: RootState) => state.common
  )

  return (
    <div className="account-container">
      <div className="container">
        <Breadcrumb page="account" />
        <div className="account-wrapper">
          <div className="account__left">
            <AccountOption />
          </div>
          <div className="account__right">
            <section className="account__option-layout">
              <header className="account__option-layout-header">
                <div>
                  <h3>{heading}</h3>
                </div>
                <button
                  onClick={() =>
                    dispatch(
                      toggleModalAccountOption(!isOpenModalOptionAccount)
                    )
                  }
                  className="btn-reset account__option-menu-btn"
                >
                  <RiMenuFill />
                </button>
              </header>
              <div className="account__option-layout-body">{children}</div>
            </section>
          </div>
        </div>
      </div>

      <Modal
        direction="right"
        isShowModal={isOpenModalOptionAccount}
        handleClickModal={() => dispatch(toggleModalAccountOption(false))}
      >
        <ModalHeading
          title="Account"
          handleClose={() => dispatch(toggleModalAccountOption(false))}
        />
        <AccountOption />
      </Modal>
    </div>
  )
}
