
import React, { Component } from "react";

import API from '../../utils/API';
import {Link} from 'react-router-dom'
import { Card, Icon } from 'antd';
import { Row, Col } from 'antd';
import { Layout} from 'antd';
import Carousel from '../../components/Carousel';
const { Content } = Layout;

// import "./Home.css";
class Home extends Component {
  state = {
    shoes:[],
    carouselIndicators:[]
  };
  
  getShoes = () =>{
    
    API.getShoes().then(shoes=>{
        
        let stateshoes = shoes.data.map((shoe, index)=>(
          <div className={index ===0 ? "carousel-item active": "carousel-item"} key={shoe._id}>
          <a href={"/shoes/"+ shoe._id}>
          <Card style={{ width: 500, height: 450 }} bodyStyle={{ padding: 10 }} className="bg-dark">
    <div className="custom-image">
      <img alt="example" width="100%" src={shoe.images[0]} />
    </div>
    <div className="custom-card">
      <h3 className="text-white">{shoe.price}</h3>
      <h4 className="text-white">{shoe.name}</h4>
    </div>
    <br/>
    
  </Card>
          </a>
          </div>
          //  <div key={shoe._id} className={index==0?'carousel-item active':'carousel-item'}>
          //       <a href={"/shoes/"+shoe._id} user={this.state.user}><img className="center-block img-thumbnail  w-50" src={shoe.images[0]} alt="First slide"/>
          //       <div className="carousel-caption d-none d-md-block">
          //           <h2 className="text-default" >{shoe.name}</h2>
          //           <h2 className="text-default">{shoe.price}</h2>
          //       </div></a>
          //   </div>
        ));
        this.setState({shoes:stateshoes});
        let indicators = shoes.data.map((shoe, index)=>(
          <li data-target="#carouselExampleIndicators" data-slide-to={index} className={index===0 ? "active":""}></li>
          
        ));
        this.setState({carouselIndicators: indicators});
    }).catch(err=>console.log(err));
  }
  componentDidMount() {
    this.getShoes();
    
  }

  render() {
    
    return (
        
  <div>
    <Content>
     
    
      <nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand" href="/home">Shoe Plug</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
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
      <Col  ><h1>Welcome to Shoe Plug!</h1><br/></Col>
    </Row> 
    
<Row type="flex" justify="center">
<Col>
    <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
  <ol className="carousel-indicators">
    {this.state.carouselIndicators}
    
  </ol>
  <div className="carousel-inner" >
    {this.state.shoes}
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
</Row>


</Content>
    
    
      
  </div>
     
    );
  }
}

export default Home;
