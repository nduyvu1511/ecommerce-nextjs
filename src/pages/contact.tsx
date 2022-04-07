import { Breadcrumb } from "@/components"
import { MainLayout } from "@/layout"
import { FiPhoneCall } from "react-icons/fi"
import { HiOutlineMail } from "react-icons/hi"
import { MdLocationPin } from "react-icons/md"

const Contact = () => {
  const language = "vni"

  return (
    <section className="contact__container">
      <div className="container">
        <Breadcrumb page="contact" />
        <header className="contact__header">
          <h2 className="contact-heading">
            {language === "vni" ? "Liên Lạc" : "Get In Touch"}
          </h2>
          <p className="contact-paragraph">
            Giải pháp số hóa kinh doanh toàn cầu: Cung cấp hệ thống CLOUD ERP,
            Hệ thống DMSPLUS, Xây dựng app di dộng, Website Ecommerce.
          </p>
        </header>

        <div className="contact__body">
          <ul className="contact__body-list grid grid-col-1 grid-col-md-2 grid-col-lg-3">
            <li className="contact__body-list-item">
              <MdLocationPin />
              <h5>102 Street 2714 Donovan</h5>
              <p>
                {language === "vni" ? "Địa chỉ của chúng tôi" : "Our address"}
              </p>
            </li>

            <li className="contact__body-list-item">
              <FiPhoneCall />
              <h5>0909.099.580</h5>
              <p>
                {language === "vni"
                  ? "Liên hệ bằng số điện thoại"
                  : "Contact by phone number"}
              </p>
            </li>

            <li className="contact__body-list-item">
              <HiOutlineMail />
              <h5>102 Street 2714 Donovan</h5>
              <p>
                {language === "vni" ? "Liên hệ bằng email" : "Contact by email"}
              </p>
            </li>
          </ul>

          <div className="contact__body-form-wrapper">
            <header className="contact__body-form-header">
              <h3 className="contact-heading">
                {language === "vni" ? "Gửi Cho Chúng Tôi" : "Send Us"}
              </h3>
              <p className="contact-paragraph">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Expedita quaerat unde quam dolor culpa veritatis inventore, aut
                commodi eum veniam vel.
              </p>
            </header>

            <form action="#" className="contact__body-form">
              <div className="form-item">
                <input
                  type="text"
                  placeholder={language === "vni" ? "Your name" : "Tên của bạn"}
                  className="form-item-input"
                />
              </div>

              <div className="form-item">
                <input
                  type="text"
                  placeholder={
                    language === "vni" ? "Your email" : "Email của bạn"
                  }
                  className="form-item-input"
                />
              </div>

              <div className="form-item">
                <textarea
                  placeholder={language === "vni" ? "Lời nhắn" : "Your message"}
                  className="form-item-input"
                  name=""
                  id=""
                  cols={30}
                  rows={10}
                ></textarea>
              </div>

              <button className="btn-primary">
                {language === "vni" ? "Send Message" : "Gửi lời nhắn"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

Contact.Layout = MainLayout

export default Contact
