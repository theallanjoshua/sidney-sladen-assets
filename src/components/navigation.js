import * as React from 'react';
import { Link } from 'react-router-dom'
import { Consumer } from '../context';
import {
  Row,
  Col,
  Menu,
  Avatar,
  Affix,
} from 'antd';
import {
  HomeOutlined,
  HomeFilled,
  ShoppingOutlined,
  ShoppingFilled,
  PictureOutlined,
  PictureFilled,
  ReadOutlined,
  ReadFilled,
  PhoneOutlined,
  PhoneFilled,
  LogoutOutlined
} from '@ant-design/icons';
import { LOGO } from '../constants/app';
// import Credentials from '../utils/credentials';
import toMaterialStyle from 'material-color-hash';
import {
  getPathFromLocation,
  PAGE_URL_TITLE_MAP,
  HOME,
  SHOP,
  GALLERY,
  STORIES,
  CONTACT,
} from '../constants/pages';
import { withRouter } from 'react-router';

const { SubMenu, Item, Divider } = Menu;
const items = [
  {
    href: HOME,
    icon: <HomeOutlined />,
    activeIcon: <HomeFilled />
  },
  {
    href: SHOP,
    icon: <ShoppingOutlined />,
    activeIcon: <ShoppingFilled />
  },
  {
    href: GALLERY,
    icon: <PictureOutlined />,
    activeIcon: <PictureFilled />
  },
  {
    href: STORIES,
    icon: <ReadOutlined />,
    activeIcon: <ReadFilled />
  },
  {
    href: CONTACT,
    icon: <PhoneOutlined />,
    activeIcon: <PhoneFilled />
  },
];

const NavItems = ({ isBottom }) => <Menu
  style={{ backgroundColor: '#000', borderBottom: 'none' }}
  className={isBottom ? 'space-between' : 'right-align'}
  mode='horizontal'
  selectedKeys={[ getPathFromLocation() ]}
>
  {items.map(({ href, icon, activeIcon }) => <Item key={href}>
    <Link to={href}>
      <span>
        {getPathFromLocation() === href ? activeIcon : icon}
        {!isBottom ? <span style={{ marginLeft: '10px' }}>{PAGE_URL_TITLE_MAP[href]}</span> : null}
      </span>
    </Link>
  </Item>)}
</Menu>;

class TopNav extends React.Component {
  render = () => <Consumer>
    {({ email, avatar }) => <Affix>
      <Row
        className='center-align'
        style={{ paddingLeft: '10px' }}
      >
        <Col
          xs={20}
          sm={20}
          md={5}
          lg={5}
          xl={3}
          xxl={3}
        >
          <Link to={HOME}>
            {LOGO}
          </Link>
        </Col>
        <Col
          xs={0}
          sm={0}
          md={17}
          lg={17}
          xl={20}
          xxl={20}
        >
          <NavItems />
        </Col>
        <Col
          xs={4}
          sm={4}
          md={2}
          lg={2}
          xl={1}
          xxl={1}
        >
          <Menu
            style={{ backgroundColor: '#000', borderBottom: 'none' }}
            className='right-align'
            mode='horizontal'
            selectedKeys={[]}
          >
            <SubMenu
              title={<Avatar
                style={{ ...toMaterialStyle(email), marginBottom: '3px' }}
                src={avatar}
                children={email.substr(0,1).toUpperCase()}
                size='small'
              />}
              >
              <Divider />
              <Item>
                <span>
                  <LogoutOutlined />
                  {/* <span onClick={() => Credentials.logout()}>Logout</span> */}
                  <span>Logout</span>
                </span>
              </Item>
            </SubMenu>
          </Menu>
        </Col>
      </Row>
    </Affix>}
  </Consumer>
}

class BottomNav extends React.Component {
  render = () => <Affix offsetBottom={0}>
    <Row className='center-align'>
      <Col
        xs={24}
        sm={24}
        md={0}
        lg={0}
        xl={0}
        xxl={0}
      >
        <NavItems isBottom />
      </Col>
    </Row>
  </Affix>
}

export const TopNavigation = withRouter(TopNav);
export const BottomNavigation = withRouter(BottomNav);