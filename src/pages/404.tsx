/* eslint-disable @next/next/no-img-element */
import { MainLayout } from "@/layout"
import Link from "next/link"

const NotFound = () => {
  const language = "vni"

  return (
    <div className="container not-found">
      <img src="https://myu.vn/public/assets/img/404.svg" alt="." />
      <h3>{language === "vni" ? "Không tìm thấy trang!" : "Page not found"}</h3>
      <Link href="/" passHref>
        <button className="btn-primary">
          {language === "vni" ? "Trở về trang chủ" : "Return to home page"}
        </button>
      </Link>
    </div>
  )
}

NotFound.Layout = MainLayout

export default NotFound
