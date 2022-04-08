import { LayoutProps } from "@/models"
import { useRouter } from "next/router"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../core"
import { MainLayout } from "./main"

export const MainAuthLayout = ({ children }: LayoutProps) => {
  const { token } = useSelector((state: RootState) => state.user)
  const router = useRouter()

  useEffect(() => {
    if (!token) {
      router.push("/login")
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  return <MainLayout>{children}</MainLayout>
}
