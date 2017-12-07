
import React, { Component } from "react";
import { Link } from "react-router-dom";
import {Icon, Row, Col} from "antd";
import API from "../../utils/API";
class Brands extends Component {
  state = {
    brands: []
  };

  buildHeaders = (brands)=>{
      let headers = brands.map((brand, index) =>(
          <li key={index}>
            <a href={"/brands/"+brand}><h2>{brand}</h2></a>
          </li>
      ));
      this.setState({brands:headers});

  }
  makeUnique = (brands) => {
    return brands.filter((elem, pos, arr) => {
      return arr.indexOf(elem) == pos;
    });
  };
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
    API.getShoes()
      .then(res => {
          let shoes = res.data;
          
          let brands = shoes.map(shoe=>shoe.brand);
          let unique = this.makeUnique(brands);
          
          
          this.buildHeaders(unique);
              
      })
      .catch(err => console.log(err));
      
  }

  render() {
    
    return (<div>
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
      <Link to="/brands" className="nav-link active">Brands</Link>
      </li>
      <li className="nav-item nav-right">
      <Link to="/checkout" className="nav-link"><Icon type="shopping-cart"/>Cart</Link>
      </li>
      <li className="nav-item">
      <Link to="/admin" className="nav-link"><Icon type="tool" /> Admin</Link>
      </li>
    </ul>
    
  </div>
</nav>
<br/>
    <Row type="flex" justify="center">
      <Col>
          <h1>Shop By Brand</h1><br/>
      </Col>
    </Row>
    <Row type="flex" justify="center">
      <Col>
      <ul className="text-dark">
            {this.state.brands}
      </ul>
            
      </Col>
    </Row>
    
    
    </div>
    );
  }
}

export default Brands;
