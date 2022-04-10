import {
  AttachmentProps,
  DeleteRatingProps,
  GetRatingByProductProps,
  UpdateRatingProps,
} from "@/models"
import axiosClient from "."

const ratingApi = {
  getRatingTags: (product_id?: number) => {
    return axiosClient.post("/comment_controller/get_rating_tag", {
      params: {
        product_id: product_id || null,
      },
    })
  },

  createAttachment: (params: AttachmentProps) => {
    return axiosClient.post("/comment_controller/create_attachment", {
      params,
    })
  },

  getProductsPurchased: (token: string) => {
    return axiosClient.post(
      "/comment_controller/get_purchase_product_history",
      {
        params: {
          token,
        },
      }
    )
  },

  updateRatingProduct: (props: UpdateRatingProps) => {
    return axiosClient.post("/comment_controller/update_rating_product", {
      params: props,
    })
  },

  deleteRatingProduct: (params: DeleteRatingProps) => {
    return axiosClient.post("/comment_controller/delete_rating_product", {
      params,
    })
  },

  getRatingsByProduct: (params: GetRatingByProductProps) => {
    return axiosClient.post("/comment_controller/get_rating_by_product", {
      params,
    })
  },
}

export default ratingApi
