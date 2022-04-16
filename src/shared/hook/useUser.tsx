import { RootState } from "@/core/store"
import { UpdateUserPropsHook, UserInfo } from "@/models"
import { editUserInfo, setMessage, setUserInfo } from "@/modules"
import userApi from "@/services/userApi"
import { useDispatch, useSelector } from "react-redux"
import useSWR from "swr"

interface UserRes {
  data: UserInfo
  isValidating: boolean
  error: any
  updateUser: (user: UpdateUserPropsHook) => void
}

const useUser = (): UserRes => {
  const { token } = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch()

  const { data, error, isValidating, mutate } = useSWR(
    "user_info_edit",
    token
      ? () =>
          userApi.getUserInfo({ token }).then((res: any) => {
            const user = res?.result?.data || {}
            if (user) return user
          })
      : null,
    {
      revalidateOnFocus: false,
    }
  )

  const updateUser = (user: UpdateUserPropsHook) => {
    if (!token) return

    userApi.updateUser({ ...user, token }).then((res: any) => {
      if (res?.result?.success) {
        dispatch(
          editUserInfo({
            email: user.email,
            name: user.name_customs,
            sex: user.sex,
            image: user?.image || "",
          })
        )
        dispatch(
          setMessage({
            title: "Chỉnh sửa thông tin thành công!",
            isOpen: true,
          })
        )
      } else {
        dispatch(
          setMessage({
            title: res?.result?.message || "",
            isOpen: true,
            type: "danger",
          })
        )
      }
    })
  }
  return {
    data,
    error,
    isValidating,
    updateUser,
  }
}

export { useUser }
