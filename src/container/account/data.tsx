import { BiHomeAlt } from 'react-icons/bi';
import { FiShoppingBag } from 'react-icons/fi';
import { MdOutlineInfo, MdOutlineLocationOn } from 'react-icons/md';

interface UserInfoField {
  id: 'name' | 'email' | 'sex' | 'phone';
  vniTitle: string;
  engTitle: string;
  type: 'text' | 'radio' | 'dropdown';
}

export const inputs: UserInfoField[] = [
  {
    id: 'name',
    vniTitle: 'Tên Đăng Nhập',
    engTitle: 'User name',
    type: 'text',
  },
  {
    id: 'email',
    vniTitle: 'Email',
    engTitle: 'Email',
    type: 'text',
  },
  {
    id: 'phone',
    vniTitle: 'Số Điện Thoại',
    engTitle: 'Phone Number',
    type: 'text',
  },
  {
    id: 'sex',
    vniTitle: 'Giới Tính',
    engTitle: 'Gender',
    type: 'radio',
  },
];

export const accountOptionList = [
  {
    id: 'general',
    vniTitle: 'Tổng quan',
    engTitle: 'General',
    icon: <BiHomeAlt />,
  },

  {
    id: 'info',
    vniTitle: 'Hồ sơ',
    engTitle: 'Information',
    icon: <MdOutlineInfo />,
  },
  {
    id: 'address',
    vniTitle: 'Địa chỉ',
    engTitle: 'Address',
    icon: <MdOutlineLocationOn />,
  },
  {
    id: 'order_history',
    vniTitle: 'Đơn mua',
    engTitle: 'My Order',
    icon: <FiShoppingBag />,
  },
];
