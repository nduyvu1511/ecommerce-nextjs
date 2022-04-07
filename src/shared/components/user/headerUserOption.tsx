import { userLinks } from "../header/data"
import Link from "next/link"

const HeaderUserOption = ({ setOpenModal }: { setOpenModal?: Function }) => {
  const language = "vni"

  return (
    <div className="user__loggedin-option">
      <ul className="user__loggedin-option-list">
        {userLinks.map((user, index) => (
          <li
            onClick={() => setOpenModal && setOpenModal()}
            key={index}
            className="user__loggedin-option-list-item"
          >
            {user.path ? (
              <Link passHref href={user.path}>
                <p className="user__loggedin-option-list-item-link">
                  {language === "vni" ? user.titleVni : user.titleEng}
                </p>
              </Link>
            ) : (
              <p
                className="user__loggedin-option-list-item-link"
                onClick={() => setOpenModal && setOpenModal()}
              >
                {language === "vni" ? user.titleVni : user.titleEng}
              </p>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default HeaderUserOption
