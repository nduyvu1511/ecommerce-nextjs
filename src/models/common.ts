import { NextPage } from "next"
import { AppProps } from "next/app"
import { ReactChild, ReactElement, ReactNode } from "react"
import { ShippingAddress } from "./address"

export interface HasChildren {
  children: ReactChild
}

export interface LayoutProps {
  children: ReactNode
  locale?: string
}

export type NextPageWithLayout = NextPage & {
  Layout?: (props: LayoutProps) => ReactElement
}

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

export interface PayloadBoolean {
  payload: boolean
}

export interface BooleanType {
  payload: boolean
}

export type MessageType = "info" | "danger" | "warning" | "success"
export type MessageDirection = "center" | "top" | "bottom"
export type MessageSize = "small" | "medium" | "large"

export interface CommonSlice {
  isOpenModalProduct: boolean
  isOpenModalOptionAccount: boolean
  isOpenModalCoupons: boolean
  isOpenModalPopup: boolean
  isOpenModalConfirm: boolean
  isOpenAddressForm: boolean
  isChatboxOpen: boolean
  isExpandChatbox: boolean
  isChannelGroupOpen: boolean
  message: {
    isOpen: boolean
    title: string
    type: MessageType
    duration?: number
    direction?: MessageDirection
    size?: MessageSize
  }
  currentReviewId: number
  addressForm: ShippingAddress | undefined
  breadcrumbList: BreadcrumbItem[] | undefined
}

export interface SetMessageProps {
  payload: {
    title: string
    isOpen: boolean
    type?: MessageType
    duration?: number
    direction?: MessageDirection
    size?: MessageSize
  }
}

export interface BreadcrumbItem {
  name: string
  path: string
}
