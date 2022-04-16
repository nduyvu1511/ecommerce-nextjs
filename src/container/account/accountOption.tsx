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
  const { token, userInfo } = useSelector((state: RootState) => state.user)

  if (!userInfo) return null

  return (
    <>
      <header className="account__left-header">
        <div className="account__left-header-avatar image-container">
          <div className="image-container">
            <Image
              src={
                userInfo?.avatar ? `${DOMAIN_URL}${userInfo.avatar}` : avatar
              }
              quality={30}
              layout="fill"
              className="image"
              alt=""
            />
          </div>
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
                router.push(item.path)
                dispatch(toggleModalAccountOption(false))
              }}
              key={item.path}
              className={`account__left-body-list-item ${
                item.path === router.pathname
                  ? "account__left-body-list-item-active"
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
