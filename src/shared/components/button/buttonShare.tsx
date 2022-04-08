import { BsTwitter } from 'react-icons/bs';
import { FaFacebookF, FaLinkedinIn, FaPinterestP } from 'react-icons/fa';
import { MdOutlineMail } from 'react-icons/md';
import { RiWhatsappLine } from 'react-icons/ri';
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  PinterestShareButton,
  TwitterShareButton,
  WhatsappShareButton
} from 'react-share';

interface IButtonShare {
  name: string;
  description: string;
  imageUrl: string;
}

const ButtonShare = ({ name, description, imageUrl }: IButtonShare) => {
  const url = `${process.env.REACT_APP_URL}/${window.location.pathname}`;

  return (
    <div className="button-share">
      <FacebookShareButton
        className="button-share-facebook"
        quote={name}
        title={name}
        hashtag={`#${name}`}
        url={url}>
        <FaFacebookF />
      </FacebookShareButton>

      <TwitterShareButton
        className="button-share-twitter"
        title={name}
        url={url}>
        <BsTwitter />
      </TwitterShareButton>

      <WhatsappShareButton
        className="button-share-whatsapp"
        title={name}
        url={url}>
        <RiWhatsappLine />
      </WhatsappShareButton>

      <PinterestShareButton
        className="button-share-pinterest"
        title={name}
        media={imageUrl}
        description={description}
        url={url}>
        <FaPinterestP />
      </PinterestShareButton>

      <EmailShareButton className="button-share-email" title={name} url={url}>
        <MdOutlineMail />
      </EmailShareButton>

      <LinkedinShareButton
        className="button-share-linkedin"
        title={name}
        url={url}>
        <FaLinkedinIn />
      </LinkedinShareButton>
    </div>
  );
};

export default ButtonShare;