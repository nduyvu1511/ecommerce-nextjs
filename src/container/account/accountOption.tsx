import { RootState } from "@/core/store"
import { toggleModalAccountOption } from "@/modules"
import { useRouter } from "next/router"
import { FiEdit2 } from "react-icons/fi"
import { useDispatch, useSelector } from "react-redux"
import { accountOptionList } from "./data"

export const AccountOption = () => {
  const language = "vni"
  const dispatch = useDispatch()
  const router = useRouter()

  const { userInfo } = useSelector((state: RootState) => state.user)

  return (
    <>
      <header className="account__left-header">
        <p className="account__left-header-title">{userInfo.name}</p>
        <p className="account__left-header-edit">
          {language === "vni" ? "Sửa hồ sơ" : "Edit info"} <FiEdit2 />
        </p>
      </header>
      <div className="account__left-body">
        <ul className="account__left-body-list">
          {accountOptionList.map((item) => (
            <li
              onClick={() => {
                router.push(`/account/${item.id}`)
                dispatch(toggleModalAccountOption(false))
              }}
              key={item.id}
              className={`account__left-body-list-item ${
                item.id === router.pathname.split("/account/")[1]
                  ? "account__left-body-list-item-active"
                  : ""
              } ${
                item.id === "general" &&
                ((router.pathname.includes("account") &&
                  router.pathname.split("/account/")[1] === undefined) ||
                  router.pathname.split("/account/")[1] === "")
                  ? "account__left-body-list-item-general-active"
                  : ""
              }`}
            >
              <h3 className="account__left-body-list-item-heading">
                {item.icon}
                {language === "vni" ? item.vniTitle : item.engTitle}
              </h3>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}
