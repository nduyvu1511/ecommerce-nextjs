import { AiOutlineUser } from "react-icons/ai"
import { BiCategoryAlt } from "react-icons/bi"
import { BsBarChart, BsHeart } from "react-icons/bs"
import { MdOutlineLanguage } from "react-icons/md"
import {
  RiBarChartBoxLine,
  RiContactsBook2Line,
  RiHeart3Line,
  RiHeartLine,
  RiHome2Line,
  RiNewspaperLine,
  RiNotification3Line,
  RiSearch2Line,
  RiShoppingBasketLine,
  RiStoreLine,
} from "react-icons/ri"

export const navLinks = [
  { id: 1, engName: "About Us", vniName: "Về chúng tôi", path: "/about" },
  {
    id: 2,
    engName: "My Account",
    vniName: "Tài khoản",
    path: "/account",
  },
  {
    id: 3,
    engName: "Wishlist",
    vniName: "Yêu thích",
    path: "/wishlist",
  },
  {
    id: 4,
    engName: "Order Tracking",
    vniName: "Đơn hàng",
    path: "/account/order_history",
  },
]

export const userLinks = [
  {
    titleEng: "Account Information",
    titleVni: "Thông tin tài khoản",
    path: "/",
  },
  {
    titleEng: "Notification",
    titleVni: "Thông báo",
    path: "/",
  },
  {
    titleEng: "Invoices",
    titleVni: "Hóa đơn",
    path: "/",
  },
  {
    titleEng: "Address",
    titleVni: "Địa chỉ",
    path: "/",
  },
  {
    titleEng: "Recent viewed product",
    titleVni: "Sản phẩm vừa xem",
    path: "/",
  },
  {
    titleEng: "Wishlist",
    titleVni: "Yêu thích",
    path: "/",
  },
  {
    titleEng: "Logout",
    titleVni: "Đăng xuất",
  },
]

export const navs = [
  {
    id: 1,
    icon: <RiHome2Line />,
    engName: "Home",
    vniName: "Trang chủ",
    path: "/",
  },
  {
    id: 2,
    icon: <RiStoreLine />,
    engName: "Shop",
    vniName: "Sản phẩm",
    path: "/shop",
  },
  {
    id: 3,
    icon: <RiNewspaperLine />,
    engName: "News",
    vniName: "Tin tức",
    path: "/news",
  },
  {
    id: 4,
    icon: <RiContactsBook2Line />,
    engName: "Contact",
    vniName: "Liên hệ",
    path: "/contact",
  },
  // {
  //   id: 5,
  //   icon: <RiPagesLine />,
  //   engName: 'Blog',
  //   vniName: 'Blog',
  //   path: '/blog',
  // },
  {
    id: 6,
    icon: <RiHeartLine />,
    engName: "Wishlist",
    vniName: "Yêu thích",
    path: "/wishlist",
  },
  {
    id: 7,
    icon: <RiBarChartBoxLine />,
    engName: "compare",
    vniName: "So sánh",
    path: "/compare",
  },
  {
    id: 8,
    icon: <MdOutlineLanguage />,
    engName: "Language",
    vniName: "Ngôn ngữ",
    path: "/",
  },
]

export const languages = [
  { id: "vni", name: "Tiếng Việt" },
  { id: "eng", name: "English" },
]

export const headerIcons = [
  { id: "compare", icon: <RiBarChartBoxLine />, path: "/compare" },
  { id: "wishlist", icon: <RiHeart3Line />, path: "/wishlist" },
  { id: "cart", icon: <RiShoppingBasketLine />, path: "/cart" },
]

export const mobileNavIcons = [
  {
    engName: "Compare",
    vniName: "So Sánh",
    icon: <BsBarChart />,
    path: "/compare",
  },
  {
    engName: "Wishlist",
    vniName: "Yêu thích",
    icon: <BsHeart />,
    path: "/wishlist",
  },
]

export const navMobileLinks = [
  {
    id: "category",
    icon: <BiCategoryAlt />,
    engName: "Category",
    vniName: "Danh mục",
  },
  {
    id: "search",
    icon: <RiSearch2Line />,
    engName: "Search",
    vniName: "Tìm kiếm",
  },
  {
    id: "home",
    icon: <RiHome2Line />,
    engName: "Home",
    vniName: "Trang chủ",
  },
  {
    id: "account",
    icon: <AiOutlineUser />,
    engName: "Account",
    vniName: "Tài khoản",
  },
  {
    id: "notification",
    icon: <RiNotification3Line />,
    engName: "Notification",
    vniName: "Thông báo",
  },
]
