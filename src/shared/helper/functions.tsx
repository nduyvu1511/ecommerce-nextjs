import {
  AttributeWithParentId,
  CartItem,
  Category,
  DraftProductList,
  ListAttributeId,
  Product,
  ProductAttribute,
  ProductDetail,
  ProductDetailRes,
  ProductIds,
  ShippingAddress,
} from "@/models"
import _ from "lodash"

import { view1Icon, view2Icon, view3Icon, view4Icon } from "@/assets"
import { ItemDropdown } from "@/components"

export const correctEmail = (value: string) => {
  ;/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value)
}

export const correctPassword = (value: string) => {
  return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
    value
  )
}

export const isVietnamesePhoneNumberValid = (num: string) => {
  return /(((\+|)84)|0)(3|5|7|8|9)+([0-9]{8})\b/.test(num)
}

export const checkNumberPhone = (number: string) => {
  ;/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(number)
}

export const onScrollBottom = (callBack: Function) => {
  window.onscroll = function (event) {
    if (window.innerHeight + window.scrollY > document.body.offsetHeight) {
      callBack(event)
    }
  }
}

export const getRandomId = (): number => {
  return +Math.floor(Math.random() * 10000000000)
}

export function getRandomInt(min: number, max: number) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

export function isValidHttpUrl(string: string) {
  let url

  try {
    url = new URL(string)
  } catch (_) {
    return false
  }
  return url.protocol === "http:" || url.protocol === "https:"
}

export const spliceArray = (arr: Array<any>, start: number, end: number) => {
  return [...arr].splice(start, end)
}

// hàm định dạng tiền việt nam
// export function formatMoneyVND(num: string) {
//   return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
// }
export const FormatNumber = (money: number, separator = ",") => {
  if (!money) return "0"
  return (money + "").replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1" + separator)
}

export const formatNumberDec = (
  nStr: string,
  decSeparate: string,
  groupSeparate: string
) => {
  nStr += ""
  let x = nStr.split(decSeparate)
  let x1 = x[0]
  let x2 = x.length > 1 ? "." + x[1] : ""
  let rgx = /(\d+)(\d{3})/
  while (rgx.test(x1)) {
    x1 = x1.replace(rgx, "$1" + groupSeparate + "$2")
  }
  return x1 + x2
}
// hàm định dạng tiền việt nam

export function formatMoneyVND(num: number | string) {
  if (typeof num == "number") {
    num = Math.floor(num)
    return `${num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ`
  } else if (typeof num == "string") {
    return `${num.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")} đ`
  }
}

export const translateDataToTree = (categories: Category[]) => {
  _(categories).forEach((f) => {
    f.children = _(categories)
      .filter((g) => g.parent_id === f.id)
      .value()
  })
  return _(categories)
    .filter((f) => !f.parent_id)
    .value()
}

export const getBannerUrlList = (list: Category[]) => {
  const bannerUrlList: Array<string> = []

  list.forEach((item) => {
    if (item.image.length > 0) {
      item.image?.forEach((url) => bannerUrlList.push(url))
    }
  })
  return bannerUrlList
}

export function formatNumberInput(value: string, separator = ",") {
  value += ""
  const list = value.split(".")
  const prefix = list[0].charAt(0) === "-" ? "-" : ""
  let num = prefix ? list[0].slice(1) : list[0]
  let result = ""
  while (num.length > 3) {
    result = `${separator}${num.slice(-3)}${result}`
    num = num.slice(0, num.length - 3)
  }
  if (num) {
    result = num + result
  }
  return `${prefix}${result}${list[1] ? `.${list[1]}` : ""}`
}

export const toFirstUpperCase = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export const toFirstLowerCase = (string: string) => {
  return string.charAt(0).toLowerCase() + string.slice(1)
}

export function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window
  return {
    width,
    height,
  }
}

export function getFullAddress(address?: ShippingAddress): string {
  if (!address) return ""
  return `${address.street}, ${address.ward_id}, ${address.district_id}, ${address.state_id}.`
}

export function productListToObjectIdQuantity(
  productList: CartItem[]
): DraftProductList {
  if (productList?.length === 0) {
    return {}
  }

  return productList.reduce(
    (obj, item) =>
      Object.assign(obj, {
        [item.product_prod_id]:
          item.price_table?.length > 0
            ? item.price_table.map((y) => ({
                id: y.uom_id,
                qty: item.quantity,
              }))
            : item.quantity,
      }),
    {}
  )
}

export function isExistCart(
  obj1: CartItem | ProductIds,
  obj2: CartItem | ProductIds
) {
  return (
    obj1.product_tmpl_id === obj2.product_tmpl_id &&
    obj1.product_prod_id === obj2.product_prod_id
  )
}

export function isObjectHasValue(obj: any): boolean {
  return obj && _.isObject(obj) && Object.keys(obj).length > 0
}

export function isArrayHasValue(array: any): boolean {
  return array && _.isArray(array) && array.length > 0
}

export function getPriceProduct(product: Product): number {
  const deal = product?.daily_deal_promotion
  if (deal && Object.keys(deal).length > 0) {
    if (deal.compute_price === "fixed") {
      return deal.fixed_price
    }

    if (deal.compute_price === "percentage") {
      return product.price * (1 - deal.percent_price / 100)
    }
  }

  return product.price
}

export function getPercentageProductDeal(product: Product): number {
  const deal = product?.daily_deal_promotion
  if (deal && Object.keys(deal).length > 0) {
    if (deal.compute_price === "fixed") {
      return ((deal.fixed_price - product.price) / product.price) * 100
    }

    if (deal.compute_price === "percentage") {
      return deal.percent_price
    }
  }

  return product.price
}

export function getProductId(product: Product): number {
  return product.attributes.length > 0
    ? product.product_tmpl_id
    : product.product_prod_id
}

export const getFromLocalStorage: any = (key: string) => {
  if (typeof window !== "undefined") {
    const value = window.localStorage.getItem(key)
    if (typeof value !== "object" && typeof value !== "function") {
      return value
    } else {
      return JSON.parse(value as any)
    }
  }
}

export function getTotalPrice(productList: CartItem[]) {
  return productList.reduce(
    (prev, curr) => prev + curr.price * curr.quantity,
    0
  )
}

export const setToLocalStorage: any = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    console.log(value)
    if (typeof value !== "object" && typeof value !== "function") {
      window.localStorage.setItem(key, JSON.stringify(value))
    } else {
      window.localStorage.setItem(key, value)
    }
  }
}

export const getFromSessionStorage: any = (key: string) => {
  if (typeof window !== "undefined") {
    return window.sessionStorage.getItem(key)
  }
}

export const setToSessionStorage: any = (key: string, value: any) => {
  if (typeof window !== "undefined") {
    return window.sessionStorage.setItem(key, value)
  }
}

export const getAttributeList = (product: Product): AttributeWithParentId[] => {
  return product.attributes?.length > 0
    ? [...product.attributes].map((item) => ({
        parentId: item.id,
        ...item.values[0],
      }))
    : []
}

export const getListAttributeId = (product: Product): ListAttributeId => {
  return {
    id: product?.product_tmpl_id || 0,
    lst_attributes_id:
      product?.attributes?.length > 0
        ? product.attributes.map((item: ProductAttribute) => item.values[0].id)
        : [],
  }
}

export function mergeProductAndProductDetail({
  product,
  productDetail,
}: {
  product: Product
  productDetail: ProductDetailRes
}): ProductDetail {
  return {
    ...product,
    ...productDetail,
    image_url:
      productDetail.image_url?.length > 0
        ? productDetail.image_url
        : product.image_url,
    price: productDetail.price,
    product_prod_id: productDetail.id,
    qty_available: productDetail.qty_available,
  }
}

export const listView = [
  { id: 1, icon: view1Icon, value: "1" },
  { id: 2, icon: view2Icon, value: "2" },
  { id: 3, icon: view3Icon, value: "3" },
  { id: 4, icon: view4Icon, value: "4" },
]

export const limitProductList: ItemDropdown[] = [
  {
    id: 1,
    title: "12",
    value: { limit: 12 },
  },
  {
    id: 2,
    title: "24",
    value: { limit: 24 },
  },
  {
    id: 3,
    title: "36",
    value: { limit: 36 },
  },
  {
    id: 4,
    title: "48",
    value: { limit: 48 },
  },
]

export const sortList: ItemDropdown[] = [
  {
    id: 5,
    title: "Mặc định",
    value: { type_get: "" },
  },
  {
    id: 1,
    title: "Giá: thấp đến cao",
    value: { type_get: "price_reduction" },
  },
  {
    id: 2,
    title: "Giá: cao đến thấp",
    value: { type_get: "price_increase" },
  },
  {
    id: 3,
    title: "Mới nhất",
    value: { type_get: "new" },
  },
  {
    id: 4,
    title: "Khuyến mãi",
    value: { type_get: "sale" },
  },
]
