import { RootState } from "@/core/store"
import { Field, Form, Formik } from "formik"
import { useRouter } from "next/router"
import { useRef, useState } from "react"
import {
  MdOutlineKeyboardArrowDown,
  MdOutlineKeyboardArrowUp
} from "react-icons/md"
import { useSelector } from "react-redux"
import { useReview } from "shared/hook"
import { messageSchema } from "../../../core/schema"
import { ModalConfirm } from "../modal"
import { ReviewItem } from "./reviewItem"

const ProductReview = () => {
  const language = "vni"
  const divRef = useRef<HTMLDivElement>(null)
  const commentForm = useRef<HTMLDivElement>(null)
  const router = useRouter()

  const { currentReviewId } = useSelector((state: RootState) => state.common)

  const {
    data: reviews,
    handleAddReview,
    handleDeleteReview,
  } = useReview({
    product_id: Number(router.query.productId) || 0,
  })

  // const {
  //   comments: { data: list },
  //   token,
  // } = useSelector((state: RootState) => state.user);
  // const {
  //   productDetail: { data: product },
  // } = useSelector((state: RootState) => state.product);

  // const [page, setPage] = useState<number>(() => (list.length > 0 ? 1 : 0));

  // const { data: reviews, totalPage } = usePagination({
  //   page,
  //   limit: 8,
  //   list,
  // });

  // const {
  //   productDetail: { data: product },
  // } = useSelector((state: RootState) => state.product)

  const [isOpenReviewForm, setOpenReviewForm] = useState<boolean>(
    reviews?.length > 0
  )

  const handleAdd = (values: any, onSubmitProps: any) => {
    if (!values?.message) return

    handleAddReview({
      content: values.message,
      product_id: Number(router.query?.productId) || 0,
    })
    onSubmitProps.resetForm()
  }

  return (
    <div ref={divRef} className="product__review">
      <div className="product__review-form">
        <h3
          onClick={() => setOpenReviewForm(!isOpenReviewForm)}
          className="product__review-form-heading"
        >
          {language === "vni" ? "Thêm đánh giá" : "Add a review"}
          {isOpenReviewForm ? (
            <MdOutlineKeyboardArrowDown />
          ) : (
            <MdOutlineKeyboardArrowUp />
          )}
        </h3>

        <div
          ref={commentForm}
          style={{
            height: isOpenReviewForm
              ? 0
              : `${commentForm?.current?.offsetHeight || 182}px`,
          }}
          className="product__review-form-wrapper"
        >
          <Formik
            initialValues={{
              message: "",
            }}
            validationSchema={messageSchema}
            onSubmit={handleAdd}
          >
            {({ errors, touched, isValid }) => {
              return (
                <Form className="address__form-body-form">
                  <div className="form-item-inline">
                    <Field
                      className={`form-item-input ${
                        errors.message ? "form-item-input-error" : ""
                      }`}
                      as="textarea"
                      rows={3}
                      id="detailAddress"
                      type="area"
                      placeholder={
                        language === "vni"
                          ? "Your review..."
                          : "Đánh giá của bạn..."
                      }
                      name="message"
                    />
                    {errors.message && touched.message ? (
                      <p className="form-item-text-error">{errors.message}</p>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className={`btn-primary btn-save ${
                      !isValid ? "btn-disabled" : ""
                    }`}
                  >
                    {language === "vni" ? "Thêm" : "Add"}
                  </button>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>

      {
        reviews?.length === 0 ? (
          <p className="product__tab-content-text">{"Chưa có đánh giá nào!"}</p>
        ) : null
        // <p className="product__tab-content-text">{`${reviews.length} Đánh giá cho sản phẩm ${product.name}`}</p>
      }

      {reviews?.length > 0 ? (
        <ul className="comment__list">
          {reviews.map((comment) => (
            <ReviewItem key={comment.id} comment={comment} />
          ))}
        </ul>
      ) : null}

      {/* <div className="comment__pagination">
        {totalPage >= 2 ? (
          <Pagination
            currentPage={page}
            onPaginate={(page: number) => {
              setPage(page)
              divRef.current?.scrollIntoView()
            }}
            totalPage={totalPage}
          />
        ) : null}
      </div> */}

      <ModalConfirm
        desc="Are you sure to delete this comment?"
        confirmModal={() =>
          handleDeleteReview({
            comment_id: currentReviewId,
            product_id: Number(router.query?.productId) || 0,
          })
        }
      />
    </div>
  )
}

export default ProductReview
