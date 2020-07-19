import * as React from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import ReactDOM from 'react-dom';
import { Provider } from './context';
import { Layout, Spin, Alert, BackTop } from 'antd';
import { PAGE_ERROR } from './constants/app';
// import Credentials from './utils/credentials';
import { TopNavigation, BottomNavigation } from './components/navigation';
// import BreadcrumbBar from './components/breadcrumb-bar';
import { Home } from './pages/home';
import { Shop } from './pages/shop';
import { Gallery } from './pages/gallery';
import { Stories } from './pages/stories';
import { Contact } from './pages/contact';
import 'antd/dist/antd.dark.less';
import './index.less';
import {
  HOME,
  SHOP,
  GALLERY,
  STORIES,
  CONTACT,
} from './constants/pages';

const { Content } = Layout;

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      errorMessage: '',
      name: '',
      email: '',
      avatar: '',
    };
  }
  // componentDidMount = () => this.authenticate();
  // authenticate = async () => {
  //   this.setState({ loading: true });
  //   try {
  //     const session = await Credentials.authenticate();
  //     if (session) {
  //       const idToken = session.getIdToken();
  //       const { payload } = idToken;
  //       const { email, name, picture } = payload || {};
  //       const avatar = picture ? picture.includes('"url":') ? JSON.parse(picture).data.url : picture : '';
  //       this.setState({ email, name, avatar, loading: false });
  //     }
  //   } catch (error) {
  //     if(error) {
  //       this.setState({ errorMessage: PAGE_ERROR, loading: false });
  //     }
  //   }
  // }
  setPageLoading = loading => this.setState({ loading });
  setPageErrorMessage = errorMessage => this.setState({ errorMessage });
  render = () => <Provider value={{
    ...this.state,
    setPageLoading: this.setPageLoading,
    setPageErrorMessage: this.setPageErrorMessage,
  }}>
    {this.state.errorMessage ? <Alert
      type='error'
      showIcon
      message={this.state.errorMessage}
      style={{
        width: 'max-content',
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: '20px'
      }}
    /> :
    <Spin spinning={this.state.loading}>
      <Router>
        <TopNavigation />
        <Layout style={{ minHeight: '100vh', padding: '10px' }}>
          <Content>
          <br />
          <Switch>
            <Route exact path={HOME} component={Home} />
            <Route exact path={SHOP} component={Shop} />
            <Route exact path={GALLERY} component={Gallery} />
            <Route exact path={STORIES} component={Stories} />
            <Route exact path={CONTACT} component={Contact} />
          </Switch>
          </Content>
          <BackTop />
        </Layout>
        <BottomNavigation />
      </Router>
    </Spin>}
  </Provider>;
}

ReactDOM.render(<App />, document.getElementById('app'));