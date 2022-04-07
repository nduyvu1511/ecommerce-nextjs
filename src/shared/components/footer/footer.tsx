import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { FiPhoneCall } from "react-icons/fi"
import { HiOutlineMail } from "react-icons/hi"
import {
  RiFacebookCircleFill,
  RiGlobalLine,
  RiYoutubeFill,
} from "react-icons/ri"
import { useCategory } from "shared/hook"
import { appStoreIcon, couponImg, googlePlayIcon, paymentImg } from "@/assets"
import { slogans } from "./data"

export const Footer = () => {
  const language = "vni"
  const [value, setValue] = useState("")
  const { data: categories } = useCategory()

  return (
    <section className="footer">
      <div className="footer__notification">
        <div className="container">
          <div className="footer__notification-wrapper">
            <div className="footer__notification-left">
              <h3>
                {language === "vni"
                  ? "Đăng ký nhận tin"
                  : "Join our newsletter and get..."}
              </h3>
              <p>
                {language === "vni"
                  ? "Đăng ký bằng email để nhận được ưu đãi mới nhất từ chúng tôi"
                  : "Join our email subscription now to get updates on promotions and coupons"}
              </p>
              <form className="footer__notification-left-form">
                <input
                  onChange={(e) => setValue(e.target.value)}
                  value={value}
                  type="text"
                  placeholder={
                    language === "vni"
                      ? "Địa chỉ email của bạn"
                      : "Your email address"
                  }
                />
                <HiOutlineMail />
                <input
                  type="submit"
                  value={language === "vni" ? "Đăng Ký" : "Subscribe"}
                />
              </form>
            </div>
            <div className="footer__notification-right">
              <div className="image-container">
                <Image src={couponImg} alt="" className="image" layout="fill" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="footer__slogan">
          <ul className="footer__slogan-list">
            {slogans.map((slo) => (
              <li key={slo.id} className="footer__slogan-list-item">
                {language === "vni" ? slo.vniName : slo.engName}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="footer__main">
        {categories && categories.length > 0 && (
          <div className="footer__main-category">
            <div className="container">
              <ul className="category-list">
                {categories.map((cate) => (
                  <li key={cate.id} className="category-list-item">
                    <Link href={`/shop/category/${cate.id}`} passHref>
                      <a className="cateegory-list-item-heading">{cate.name}</a>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="footer__main-contact">
          <div className="container">
            <div className="footer__main-contact-wrapper">
              <div className="footer__main-contact-left">
                <span className="phone-icon">
                  <FiPhoneCall />
                </span>
                <div className="phone-info">
                  <p>0909.099.580</p>
                  <p>Working 8:00 - 22:00</p>
                </div>
              </div>
              <div className="footer__main-contact-right">
                <h3 className="heading">Download App on mobile: </h3>
                <div className="image-wrapper">
                  <a href="https://play.google.com/store/apps/details?id=com.satavan.app">
                    <div className="image-container image-wrapper-item">
                      <Image
                        src={googlePlayIcon}
                        alt=""
                        layout="fill"
                        className="image"
                      />
                    </div>
                  </a>
                  <a href="https://play.google.com/store/apps/details?id=com.satavan.app">
                    <div className="image-container image-wrapper-item image-wrapper-last">
                      <Image
                        src={appStoreIcon}
                        alt=""
                        layout="fill"
                        className="image"
                      />
                    </div>
                  </a>
                </div>
                <div className="icon-wrapper">
                  <a href="https://www.facebook.com/satavancom">
                    <RiFacebookCircleFill />
                  </a>
                  <a href="https://www.youtube.com/channel/UCiiDiJ6Zmuwdhvej9XFvEFA">
                    <RiYoutubeFill />
                  </a>
                  <a href="https://satavan.com">
                    <RiGlobalLine />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="footer__main-info">
            <p>
              Copyrights © 2014. All rights reserved by Satavan It Solutions
            </p>
            <div className="image-container">
              <Image src={paymentImg} alt="" layout="fill" className="image" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
