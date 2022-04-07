import { Breadcrumb, Compare as CompareChild } from "@/components"
import { MainLayout } from "@/layout"

const Compare = () => {
  return (
    <div className="container">
      <Breadcrumb page="Compare" />
      <CompareChild type="page" />
    </div>
  )
}
Compare.Layout = MainLayout

export default Compare
