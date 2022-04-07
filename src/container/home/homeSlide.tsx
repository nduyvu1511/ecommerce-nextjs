import { HomeHeading } from "@/components"
import { ReactChild } from "react"

interface HomeSlideProductProps {
  children: ReactChild
  path: string
  name: string
  title: string
}

export const HomeSlideProduct = ({
  children,
  path,
  name,
  title,
}: HomeSlideProductProps) => {
  return (
    <div className="home__content-right-products">
      <HomeHeading path={path} name={name} title={title} />
      {children}
    </div>
  )
}
