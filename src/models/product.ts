import { Token } from "./user"

export interface Unit {
  id: number
  name: string
}

export interface Attribute {
  id: number
  name: string
  price: number
}

export interface ProductAttribute {
  id: number
  name: string
  values: Attribute[]
}

export interface AttributeWithParentId extends Attribute {
  parentId: number
}

export interface Product {
  type: "product" | "combo"
  product_tmpl_id: number
  product_prod_id: number
  product_name: string
  barcode: string | boolean
  product_available: number
  star_rating: number
  uom: Unit
  vat: number
  description: string
  price: number
  price_orgin: number
  price_list: {
    type: "percentage" | "fixed"
    min_quantity: number
    value: number
  }[]
  seller_price: number
  price_table: {
    uom_id: number
    name: string
    price_unit: number
  }[]
  attributes: ProductAttribute[]
  image_url: Array<string>
  variant_id?: number
  company: {
    company_id: false
    company_name: false
  }
  qty_available: number
  price_origin: number
  price_discount: number
  category: {
    id: number
    name: string
  }
  daily_deal_promotion: {
    price_discount: number
    compute_price: "fixed" | "percentage"
    fixed_price: number
    percent_price: number
  }
}

export interface ProductDetailRes {
  description_sale: string
  wholesales: Array<string>
  categ_id: string
  type: "product" | "combo"
  id: number
  product_tmpl_id: number
  name: string
  uom: Unit
  barcode: string
  product_available: number
  price: number
  seller_price: number
  image_url: Array<string>
  qty_available: number
}

export type ProductDetail = ProductDetailRes & Product

export interface IOffset {
  offset: number
}

export interface ILimit {
  limit: 12 | 24 | 36 | 48
}

export interface ISortType {
  type_get: "price_reduction" | "price_increase" | "new" | "sale" | ""
}

export interface ISearch {
  keyword: string
}

export interface ProductParams {
  type_get?: "price_reduction" | "price_increase" | "new" | "sale" | ""
  limit?: 6 | 12 | 24 | 36 | 48 | number
  offset?: number
  keyword?: string
  category_id?: number | false
  product_id?: number
  partner_id?: number
}

export interface ProductSearch {
  id: number
  type: string
  name: string
  company_id: boolean | string
  company_name: boolean | string
  vat: number
  price_list_ids: number
  price_list: Array<number>
  seller_price: number
  categ_name: string
  price: number
  image_url: Array<string>
}

export interface ProductCompare {
  id: number
  name: string
  product_available: number
  uom: {
    id: number
    name: string
  }
  categ_name: string
  company_name: string | boolean
  description: string
  price: number
  price_orgin: number
  seller_price: number
  image_url: string
}

export interface ChildCategory {
  id: number
  name: string
  icon: string
  url?: string | boolean
  image?: Array<string>
  parent_id: number | boolean
  description: string | boolean
}

export interface Category {
  id: number
  name: string
  icon: string
  url?: string | boolean
  image: Array<string>
  parent_id: number | boolean
  description: string | boolean
  children: Category[]
}

export interface InitialStateProduct {
  partner_id: number

  products: {
    data: Product[]
    isLoading: boolean
  }

  productDetail: {
    data: ProductDetail
    isLoading: boolean
    image_url: Array<string>
  }
  asideLeftProducts: {
    isLoading: boolean
    data: Product[]
  }
  categories: {
    data: Category[]
    isLoading: boolean
  }
  shopProducts: {
    data: Product[]
    isLoading: boolean
    isLimit: boolean
    isLoadingMore: boolean
    isPageChange: boolean
    limit: number
  }
  relatedProducts: {
    data: Product[]
    isLoading: boolean
  }
  searchProducts: {
    data: Product[]
    isLoading: boolean
    isOpen: false
    keyword: string
  }
  topProducts: {
    data: Product[]
    isLoading: boolean
  }
  variantsProductDetail: {
    attributes: AttributeWithParentId[] | undefined
  }
  bannerUrls: Array<string>
}

export interface AttributeProductValueItem {
  value_id: number
  value_name: string
  value_icon: string | boolean
}

export interface AttributeProduct {
  attribute_id: number
  attribute_name: string
  display_content: string
  min_value: number
  max_value: number
  attribute_icon: string | boolean
  value_ids: AttributeProductValueItem[]
}

export interface AttributeReq {
  attribute_id: number
  display_content: string
  value_ids: Array<number>
  min_value: number
  max_value: number
}

export interface ProductSale {
  deal_id: 1
  deal_name: string
  deals_title: string
  deal_description: string | boolean
  start_date: string
  end_date: string
  banner: string | boolean
  product_promotion: Product[]
}

export interface CartQuantity {
  id: number
  quantity: number
}

export interface ProductSlice {
  wishlistBtn: {
    currentProductId: number
    isFetching: boolean
  }
  product: Product | null
  listAttribute: AttributeWithParentId[] | undefined
  search: {
    isOpen: boolean | undefined
    keyword: string | undefined
    isSearching: boolean | undefined
  }
}

export interface ListAttributeId {
  id: number
  lst_attributes_id: Array<number>
}

export interface GetProductDetail {
  token?: string
  product_id: number
  partner_id?: number
  list_products: ListAttributeId[]
}

export interface IOffset {
  offset: number
}

export interface ILimit {
  limit: 12 | 24 | 36 | 48
}

export interface ISortType {
  type_get: "price_reduction" | "price_increase" | "new" | "sale" | ""
}

export interface ISearch {
  keyword: string
}

export interface ShopFiltterParams {
  type_get?: "price_reduction" | "price_increase" | "new" | "sale" | ""
  limit?: 12 | 24 | 36 | 48
  offset?: number
  keyword?: string
  category_id?: number
}

interface ProductIdAndToken {
  token: string
  product_id: number
}

export interface DeleteWishlistHook {
  product_id: number
  wishlist_id: number
}

export interface ProductIds {
  product_tmpl_id: number
  product_prod_id: number
}

export interface AttachmentProps extends ProductIdAndToken {
  attachments: {
    file: string
    type: "image" | "video"
  }[]
}

export interface PurchasedProductProps extends Token {
  limit?: number
  offset?: number
}

export type RatingRangePost = 1 | 2 | 3 | 4 | 5

export type RatingRange = 0 | 1 | 2 | 3 | 4 | 5

export interface UpdateRatingProps extends ProductIdAndToken {
  star_rating: RatingRangePost
  tag_ids?: Array<number>
  attachment_ids: Array<number>
  limit?: number
  offset?: number
}

export interface TagRating {
  tag_id: number
  tag_content: string
}

export interface DeleteRatingProps extends ProductIdAndToken {
  history_line_id: number
}

export interface PurchasedProduct {
  history_line_id: number
  sale_order: {
    sale_id: number
    sale_name: string
  }
  product: {
    product_id: number
    product_name: string
    qty_product: number
    price_unit: number
    amount_total: number
  }
  comment_rating: {}
}

export interface DeleteRatingRes {
  history_line_id: number
  comment_rating_id: number
}

export interface CommentRating {
  comment_id: number
  message: string | false
  star_rating: "1" | "2" | "3" | "4" | "5"
  star_rating_int: RatingRangePost
  rating_tag: TagRating[]
  product_id: number
  date: string
}

export interface GetRatingByProductProps extends Token {
  limit?: number
  offset?: number
  product_id: number
  comment_type: ["comment" | "rating"]
}
