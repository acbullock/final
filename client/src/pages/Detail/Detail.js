
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {Icon, Row, Col, Card} from "antd";
class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoe: {},
      images:[],
      sizes:[],
      selectedSize:0,
      user:{
        ObjectId:"5a11cbb7acfa896c3aeab8f3",
        username:"shoeguy123",
        password:"password123",
        cart:[]
      }
    };

    this.makeSizesOptions = this.makeSizesOptions.bind(this);
    this.makeCarouselImages = this.makeCarouselImages.bind(this);
    this.addToCart = this.addToCart.bind(this);
  }

  makeSizesOptions(){
    const sizes = this.state.shoe.sizes.map((size, index)=>(
      <option key={index} value={size}>{size}</option>
    ));
    this.setState({sizes:sizes});
  };
  makeCarouselImages(){
    
    const img = this.state.shoe.images.map((img, index)=>(

      <div key={index} className={index===0?'carousel-item active':'carousel-item'}>
        <Card style={{ width: 500, height: 450}} bodyStyle={{ padding: 10 }} className="bg-dark">
        <img className="center-block img-thumbnail" style={{padding:10}} src={this.state.shoe.images[index]} alt={this.state.shoe.name}/>
        </Card>
      </div>
    ));
    
    this.setState({images:img});
  };
  makeUnique = (users) => {

    return users.filter((elem, pos, arr) => {
      
      return users.indexOf(elem) == pos;
    });
  };
  addToCart() {
    
    let updated = this.state.user;
    
    updated.cart.push(this.state.shoe);
    updated.cart = this.makeUnique(updated.cart);
    
    // alert(JSON.stringify(updated, null, 2));
    API.update(updated);
    alert("added to cart");
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.Login(this.state.user.username, this.state.user.password)
    .then(user=>{console.log(JSON.stringify(user.data, null, 2)); this.setState({user:user.data})});
    API.getShoe(this.props.match.params.id)
      .then(res => {
        this.setState({ shoe: res.data });
        this.makeCarouselImages();
        this.makeSizesOptions();
      })
      .catch(err => console.log(err));
      
  };

  render() {
    
    return (
      <div>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="/home">Shoe Plug</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
      
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mr-auto">
            <li class="nav-item">
            <Link to="/home" className="nav-link"><Icon type="home" /> Home</Link>
            
            </li>
            
            <li class="nav-item">
            <Link to="/brands" className="nav-link">Brands</Link>
            </li>
            <li class="nav-item nav-right">
            <Link to="/checkout" className="nav-link"><Icon type="shopping-cart"/>Cart</Link>
            </li>
            <li class="nav-item">
            <Link to="/admin" className="nav-link"><Icon type="tool" /> Admin</Link>
            </li>
          </ul>
          
        </div>
      </nav>
      <br/>
      <Row type="flex" justify="center">
        <Col >
        <h1>{this.state.shoe.name}</h1>
        <h2 className="text-muted">{this.state.shoe.brand}</h2><br/>
        </Col>
      </Row>
      <Row type="flex" justify="center">
      <Col>
      <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  {/* <ol className="carousel-indicators">
    {this.state.carouselIndicators}
    
  </ol> */}
  <div className="carousel-inner" >
    {this.state.images}
  </div>
  <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="sr-only">Previous</span>
  </a>
  <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="sr-only">Next</span>
  </a>
</div>
      </Col>
      <Col >
      <Card style={{ justifyContent: "center"}} bodyStyle={{ marginLeft: 20 }}>
      <h1>{this.state.shoe.price}</h1>
               <p>
                 {this.state.shoe.synopsis}
               </p><br/><hr/><br/>
               <div className="mb-5">
              
              
               <select className="custom-select mr-5" style={{"height":"50px"}}>
                 {this.state.sizes}
               </select>
               <button className="btn btn-warning" onClick={this.addToCart}>Add To Cart!</button>
               </div>
               </Card>
              
      </Col>
      </Row>

    </div>
      // <Container fluid>
      //   
      //   <Row>
      //     <Col size="md-6">
            
              
      //         <Carousel>
      //           {this.state.images}
      //         </Carousel>
              
            
      //     </Col>
      //     <Col size="md-6">
            
      //       <h1>{this.state.shoe.price}</h1>
      //         <p>
      //           {this.state.shoe.synopsis}
      //         </p>
      //         <div className="mb-5">
      //         <h3>Available Sizes:</h3>
              
      //         <select className="custom-select mr-5" style={{"height":"50px"}}>
      //           {this.state.sizes}
      //         </select>
      //         <button className="btn btn-warning" onClick={this.addToCart}>Add To Cart!</button>
      //         </div>
      //         <div><Link to="/">← Back to Shoes</Link></div>
              
      //     </Col>
      //   </Row>
       
      // </Container>
    );
  }
}

export default Detail;
