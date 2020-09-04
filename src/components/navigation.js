import * as React from 'react';
import { Link } from 'react-router-dom'
import { Consumer } from '../context';
import {
  Row,
  Col,
  Menu,
  Avatar,
  Affix,
  Button,
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
  CalendarOutlined,
  CalendarFilled,
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
    isVisible: isBottom => !!isBottom,
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
    icon: <CalendarOutlined />,
    activeIcon: <CalendarFilled />
  },
];

const NavItems = ({ isBottom }) => <Menu
  style={{ borderBottom: 'none' }}
  className={isBottom ? 'space-between' : 'right-align'}
  mode='horizontal'
  selectedKeys={[ getPathFromLocation() ]}
>
  {items
    .filter(({ isVisible = () => true }) => isVisible(isBottom))
    .map(({ href, icon, activeIcon }) => <Item key={href}>
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
        style={{
          paddingLeft: '10px',
          minHeight: '47px',
          background: '#232323'
        }}
      >
        <Col
          xs={12}
          sm={12}
          md={5}
          lg={4}
          xl={4}
          xxl={4}
        >
          <Link to={HOME} className='vertical-center-align'>
            {LOGO}
          </Link>
        </Col>
        <Col
          xs={0}
          sm={0}
          md={16}
          lg={17}
          xl={18}
          xxl={18}
        >
          <NavItems />
        </Col>
        <Col
          xs={12}
          sm={12}
          md={3}
          lg={3}
          xl={2}
          xxl={2}
        >
          {email ? <Menu
            style={{ borderBottom: 'none' }}
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
                  <span style={{ marginLeft: '10px' }}>Logout</span>
                </span>
              </Item>
            </SubMenu>
          </Menu>  : <span className='right-align' style={{ paddingRight: '10px' }}>
            <Button
              type='primary'
              children={'Login'}
            />
          </span>}
        </Col>
      </Row>
    </Affix>}
  </Consumer>
}

class BottomNav extends React.Component {
  render = () => <Affix offsetBottom={0}>
    <Row
      className='center-align'
    >
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