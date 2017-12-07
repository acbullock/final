import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom'
import {Button} from 'antd';
import Icon from 'antd/lib/icon'
import Home from "../../pages/Home"
import Admin from "../../pages/Admin"
import Brands from "../../pages/Brands"
import ByBrand from "../../pages/ByBrand"
import Detail from "../../pages/Detail"
import Checkout from "../../pages/Checkout"
import { Layout, Form, Input} from 'antd';

import { Row, Col } from 'antd';
const {Content, Footer} = Layout;
const FormItem = Form.Item;
////////////////////////////////////////////////////////////
// 1. Click the public page
// 2. Click the protected page
// 3. Log in
// 4. Click the back button, note the URL each time

const Auth = () => (
  <Router>
     <div>
    {/*  <Layout className="layout">
      
      <Content>
  <Row>
    <Col span={24}>
    
    
        </Col>

        </Row>
        
        </Content>
        {/* <Footer>
        <AuthButton/>
   <Link to="/home"><Icon type="home" /> Home</Link>
        </Footer> 
      </Layout> */}
<AuthButton/>
      <Route exact path="/home" component={Home}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/brands" component={Brands}/>
      <Route exact path="/brands/:brand" component={ByBrand}/>
      <Route exact path="/shoes/:id" component={Detail}/>
      <Route exact path="/checkout" component={Checkout}/>
      <PrivateRoute path="/admin" component={Admin}/>
      
    </div>
  </Router>
)





const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

const AuthButton = withRouter(({ history }) => (
  fakeAuth.isAuthenticated ? (
    <p>
      Welcome Admin! <Button type="danger" onClick={() => {
        fakeAuth.signout(() => history.push('/'))
      }}>Sign out <Icon type="logout" /></Button>
    </p>
  ) : (
    <p>You are not logged in. <Link to="/home"><Icon type="home"/></Link></p>
    
  )
))

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    fakeAuth.isAuthenticated ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)



class Login extends React.Component {
  state = {
    redirectToReferrer: false
  }

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <h3>You must log in to view the page at {from.pathname}</h3>
        {/* <button onClick={this.login}>Log in</button> */}
        <Form>
          <FormItem>
            <label>Enter admin password:</label>
            <Input type="password"/>
          </FormItem>
        </Form>
        <Button type="primary" onClick={this.login}>Login <Icon type="login" /></Button>
      </div>
    )
  }
}

export default Auth