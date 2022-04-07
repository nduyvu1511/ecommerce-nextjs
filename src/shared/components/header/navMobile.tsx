import { useDispatch, useSelector } from "react-redux"
import useResize from "../../hook/useResize"
import { navMobileLinks } from "./data"
import { useRouter } from "next/router"
import { Modal } from "../modal"
import { ModalHeading } from "../heading"
import { Category } from "../category"
import { SearchForm, SearchResult } from "../search"
import { RootState } from "@/core/store"
import { AccountOption } from "@/container"
import { toggleModalAccountOption } from "@/modules"

interface ISetModalOpen {
  isOpen: boolean
  modalName: string
}

interface IModal {
  isModalOpen: ISetModalOpen
  setModalOpen: Function
}

const NavMobile = ({ isModalOpen, setModalOpen }: IModal) => {
  const language = "vni"
  // const breakpoints = useResize()
  const router = useRouter()
  const dispatch = useDispatch()

  const { token } = useSelector((state: RootState) => state.user)

  const { isOpenModalOptionAccount } = useSelector(
    (state: RootState) => state.common
  )

  const handleClickItem = (id: string) => {
    setModalOpen(id)

    if (id === "home") {
      router.push("/")
    }

    if (id === "account") {
      // token ? dispatch(toggleModalAccountOption(true)) : router.push("/login")
    }
  }

  return (
    <>
      <div className="nav__mobile">
        <ul className="nav__mobile-list">
          {navMobileLinks.map((nav) => (
            <li
              key={nav.id}
              onClick={() => handleClickItem(nav.id)}
              className="nav__mobile-list-item"
            >
              {nav.icon}
              <p>{language === "vni" ? nav.vniName : nav.engName}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="modals-mobile">
        <Modal
          direction="right"
          isShowModal={
            isModalOpen.modalName === "category" && isModalOpen.isOpen
          }
          handleClickModal={() =>
            setModalOpen({ modalName: "", isOpen: false })
          }
        >
          <ModalHeading
            handleClose={() => setModalOpen({ isOpen: false, modalName: "" })}
            title="Category"
          />
          <Category
            handleClickModal={() =>
              setModalOpen({ modalName: "", isOpen: false })
            }
            type="full"
          />
        </Modal>

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

        <Modal
          direction="right"
          isShowModal={isModalOpen.modalName === "search" && isModalOpen.isOpen}
          handleClickModal={() =>
            setModalOpen({ modalName: "", isOpen: false })
          }
        >
          <div className="nav__mobile-search-wrapper">
            <ModalHeading
              handleClose={() => setModalOpen && setModalOpen()}
              title={language === "vni" ? "Tìm Kiếm" : "Search"}
            />
            <SearchForm type="header" />
            <div className="search__result-sm">
              <SearchResult
                handleClose={() =>
                  setModalOpen({ isOpen: false, modalName: "" })
                }
              />
            </div>
          </div>
        </Modal>
      </div>
    </>
  )
}

export default NavMobile
