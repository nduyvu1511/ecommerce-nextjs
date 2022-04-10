/* eslint-disable @next/next/no-img-element */
import { avatar } from "@/assets"
import { RootState } from "@/core/store"
import { toggleModalAccountOption } from "@/modules"
import { DOMAIN_URL } from "@/services"
import Image from "next/image"
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
        <input type="file" name="" hidden id="account-avatar" />
        <div className="account__left-header-avatar image-container">
          <label htmlFor="account-avatar">
            <img
              src={
                userInfo?.avatar
                  ? `data:image/jpeg;base64,${userInfo.avatar}`
                  : avatar
              }
              alt=""
            />
          </label>
          {/* <Image
            src={`${DOMAIN_URL}${userInfo.avatar}` || ""}
            layout="fill"
            alt=""
            className="image"
          /> */}
        </div>
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
