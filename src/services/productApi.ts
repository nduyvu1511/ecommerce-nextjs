import { GetProductDetail, ProductParams } from "@/models"
import axiosClient from "."

const productApi = {
  getCategories: () => {
    return axiosClient.post("/api/v2.0/product/category", {
      params: {},
    })
  },

  getProductDetail: (params: GetProductDetail) => {
    return axiosClient.post("/api/v2.0/product_product/detail", {
      params,
    })
  },

  getProductList: (params?: ProductParams) => {
    return axiosClient.post("/attribute_filter/top_sale/", {
      params,
    })
  },

  getProductAttributeList: () => {
    return axiosClient.post(
      "/attribute_controller/get_product_attribute_list",
      {
        params: {},
      }
    )
  },

  getSaleProductList: () => {
    return axiosClient.post("/daily_deal_controller/get_daily_deal", {
      params: {},
    })
  },
}

export default productApi
