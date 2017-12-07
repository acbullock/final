
import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Col, Row, Icon, Card, Button, Modal, Form, Input, TextArea } from "antd";
import API from "../../utils/API";
const FormItem = Form.Item;

class Checkout extends Component {

    constructor(props) {
        super(props);
        this.state = {
          shoeData:{},
          shoes:[],
          user:{
            username:"shoeguy123",
            password:"password123"
          },
          loading: false,
          visible: false,
          names: []
          
        };
        this.removeFromCart = this.removeFromCart.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleOk = this.handleOk.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    showModal(){
      
      this.setState({
        visible: true
      });
    }
    handleOk(){
      this.setState({ loading: true });
      
      setTimeout(() => {
        this.setState({ loading: false, visible: false });
        



      let {cart} = this.state.user;
    cart = [];
    let updated = {
        username: this.state.user.username,
        password: this.state.user.password,
        cart: cart
    };
    API.update(updated).then(user=>{
        API.Login(updated.username, updated.password)
        .then(user=>{
            this.setState({user: user.data, shoes:[]});
        })
    });
      }, 3000);
    }
    handleCancel(){
      this.setState({ visible: false });
    }
 
  removeFromCart(id){
    let {cart} = this.state.user;
    cart = cart.filter(item=>item._id !== id);
    let updated = {
        username: this.state.user.username,
        password: this.state.user.password,
        cart: cart
    };
    API.update(updated).then(user=>{
        API.Login(updated.username, updated.password)
        .then(user=>{
            this.setState({user: user.data});
        })
    });
    let shoeImages = cart.map((shoe, index)=>(<div>
      
        <Card key={index} style={{ width: 500}} bodyStyle={{ padding: 10 }}>
        <a href={"/shoes/"+shoe._id}>
        <div className="custom-image">
        <img src={shoe.images[0]} width="100%"/></div>
        </a>
        <p className="card-text">{shoe.name}</p>
        <p className="card-text">{shoe.price}</p>
        <p className="card-text">{shoe.synopsis}</p><hr/>
        <button className="btn btn-danger" onClick = {()=>  this.removeFromCart(shoe._id)}>Remove item from cart</button>
        
        </Card>
        
        </div>
        
      ));
      this.setState({shoes:shoeImages});
      let names = cart.map((shoe, index)=>shoe.name);
      this.setState({names: names});
  }
  
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    
    
      API.Login(this.state.user.username, this.state.user.password)
      .then(user=>{
          this.setState({user: user.data});
          let {cart} = user.data;
          let names = cart.map((shoe, index)=>shoe.name);
          
          this.setState({names: names});
          let shoeImages = cart.map((shoe, index)=>(
            
            <Card key={index} style={{ width: 500}} bodyStyle={{ padding: 10 }}>
            <a href={"/shoes/"+shoe._id}>
            <div className="custom-image">
            <img src={shoe.images[0]} width="100%" /></div>
            </a>
            <h4 className="card-text">{shoe.name}</h4>
            <h4 className="card-text">{shoe.price}</h4>
            <h4 className="card-text">{shoe.synopsis}</h4>
            <br/>
            <button className="btn btn-danger" onClick = {()=>  this.removeFromCart(shoe._id)}>Remove item from cart</button>
            </Card>
            
          ));
          this.setState({shoes:shoeImages, visible: false, loading: false});
        //   alert(JSON.stringify(this.state.user, null, 2))
      });
  }

  render() {
    
    return (
      <div>
       <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <a className="navbar-brand" href="/home">Shoe Plug</a>
  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>

  <div className="collapse navbar-collapse" id="navbarSupportedContent">
    <ul className="navbar-nav mr-auto">
      <li className="nav-item">
      <Link to="/home" className="nav-link"><Icon type="home" /> Home</Link>
      
      </li>
      
      <li className="nav-item">
      <Link to="/brands" className="nav-link">Brands</Link>
      </li>
      <li className="nav-item nav-right">
      <Link to="/checkout" className="nav-link active"><Icon type="shopping-cart"/>Cart</Link>
      </li>
      <li className="nav-item">
      <Link to="/admin" className="nav-link"><Icon type="tool" /> Admin</Link>
      </li>
    </ul>
    
  </div>
</nav>
<br/>
<Row type="flex" justify="center" >
      <Col>
        <h1 style={{marginRight: 10}}>{this.state.shoes.length > 0 ? "Interested in these items?" : "Add an item to cart to checkout "}</h1>
        <br/>
        </Col>
        <Col>
        {this.state.shoes.length > 0 ? <Button  type="dashed" onClick={this.showModal}><Icon type="pay-circle"/>Checkout</Button> :<Button><Link to="/home"><Icon type="home"/> Home</Link></Button>}
      <br/></Col>
</Row>
<Row type="flex" justify="center">
  <Col>
  <div className="album text-muted">
                

               
                    {this.state.shoes}
                
            </div>
  </Col>
</Row>

<Modal
          visible={this.state.visible}
          title="Checkout"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Return</Button>,
            <Button key="submit" type="primary submit" size="large" loading={this.state.loading} onClick={this.handleOk}>
              Submit
            </Button>,
          ]}
        >
        <Form>
          <FormItem>
            <label>Subject:</label>
        <Input placeholder="Subject" value="I would like to make a purchase"/></FormItem>
        <FormItem>
        <label>Your Email Address (required):</label>
        <Input type="email" required="true"/></FormItem>
        <FormItem>
          <label>Message:</label>
        <Input type="textarea" style={{minHeight: 150}}>{"Hello,\n I am interested in the following items:\n" + this.state.names + "\n\nThank you."}</Input></FormItem></Form>
          
        </Modal>



      </div>
     
    );
  }
}

export default Checkout;
