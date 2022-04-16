import { Breadcrumb, Compare as CompareChild } from "@/components"
import { MainLayout } from "@/layout"

const Compare = () => {
  return (
    <div className="container">
      <Breadcrumb breadcrumbList={[{ name: "So sánh", path: "" }]} />
      <CompareChild type="page" />
    </div>
  )
}
Compare.Layout = MainLayout

export default Compare
