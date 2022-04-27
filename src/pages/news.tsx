import { Breadcrumb } from "@/components"
import { MainLayout } from "@/layout"

const News = () => {
  return (
    <div className="container">
      <Breadcrumb breadcrumbList={[{ name: "Tin tức", path: "" }]} />
      <br />
      Coming soon
      <br />
      <br />
      <br />
    </div>
  )
}

export async function getStaticProps() {}

News.Layout = MainLayout

export default News
