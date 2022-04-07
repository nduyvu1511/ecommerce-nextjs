import Link from "next/link"
import { CgArrowLongRight } from "react-icons/cg"

interface HomeHeadingProps {
  name: string
  title: string
  path: string
}

export const HomeHeading = ({ name, title, path }: HomeHeadingProps) => {
  const language = "vni"

  return (
    <div className="home__heading">
      <div className="home__heading-text">
        <h3>{name}</h3>
        <p>{title}</p>
      </div>

      <Link href={path} passHref>
        <p className="home__heading-btn">
          {language === "vni" ? "Xem tất cả" : "View All"} <CgArrowLongRight />
        </p>
      </Link>
    </div>
  )
}
