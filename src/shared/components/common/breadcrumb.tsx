import Link from "next/link"
import { RiArrowRightSLine } from "react-icons/ri"

interface IBreadcrumb {
  page: string | number
  child?: string
  path?: string
}

export const Breadcrumb = ({ page, child, path }: IBreadcrumb) => {
  return (
    <div className="breadcrumb">
      <div className="breadcrumb-item">
        <RiArrowRightSLine className="breadcrumb-icon-sm" />
        <Link href="/">
          <a className="cursor-pointer">Home</a>
        </Link>
      </div>
      <RiArrowRightSLine className="breadcrumb-icon-lg" />
      {child && path ? (
        <div className="breadcrumb-item">
          <RiArrowRightSLine className="breadcrumb-icon-sm" />
          <Link href={path} passHref>
            <a className="breadcrumb-current cursor-pointer">{page}</a>
          </Link>
        </div>
      ) : (
        <div className="breadcrumb-item">
          <RiArrowRightSLine className="breadcrumb-icon-sm" />
          <p className="breadcrumb-current">{page}</p>
        </div>
      )}
      {child ? (
        <>
          <RiArrowRightSLine className="breadcrumb-icon-lg" />
          <div className="breadcrumb-item">
            <RiArrowRightSLine className="breadcrumb-icon-sm" />
            <p className="breadcrumb-current">{child}</p>
          </div>
        </>
      ) : null}
    </div>
  )
}
