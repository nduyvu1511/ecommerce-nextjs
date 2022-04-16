import { CategoryItem, HomeCategory } from "@/components"
import { MainBanner, MainContent, ProductSaleContainer } from "@/container"
import { MainLayout } from "@/layout"
import { LayoutProps } from "@/models"
import { useTranslation } from "next-i18next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { useCategory } from "shared/hook"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["home"])),
    },
  }
}

const Home = ({ locale }: LayoutProps) => {
  const { t } = useTranslation()
  const { data: categories } = useCategory()
  // to use translation, just use:

  return (
    <section className="home">
      <div className="container">
        <MainBanner />
      </div>

      {/* saleProduct */}
      <ProductSaleContainer />

      <div className="container">
        <HomeCategory />
      </div>

      {/* Content */}
      <div className="container">
        <MainContent />
      </div>

      {/* Category */}
      <div className="container">
        <div className="home__category">
          <ul className="home__category-list grid grid-col-2 grid-col-sm-3 grid-col-md-4 grid-col-lg-6 grid-col-xl-8">
            {categories.map(
              (cate) =>
                cate.icon && <CategoryItem key={cate.id} category={cate} />
            )}
          </ul>
        </div>
      </div>
    </section>
  )
}

Home.Layout = MainLayout

export default Home
