
import React, { Component } from "react";
import { Link } from "react-router-dom";
import API from "../../utils/API";
import {Icon, Row, Col} from "antd";

class ByBrand extends Component {
  state = {
    shoes: []
  };
 
  
  // When this component mounts, grab the book with the _id of this.props.match.params.id
  // e.g. localhost:3000/books/599dcb67f0f16317844583fc
  componentDidMount() {
      API.getByBrand(this.props.match.params.brand).then(shoes=>{
      let shoeImages = shoes.data.map((shoe, index)=>(
        <a href={"/shoes/"+shoe._id}><div key={index} className="card m-5">
        <img alt="Thumbnail [100%x280]" style={{"width": "280px"}} src={shoe.images[0]}/>
        <p className="card-text">{shoe.name}</p>
        <p className="card-text">{shoe.price}</p>
        </div></a>
      ));
      this.setState({shoes:shoeImages});
      }).catch(err=>console.log(err));
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
            <h1>{this.props.match.params.brand}</h1>
          </Col>

        </Row>





        
      <Row type="flex" justify="center">
           <Col >
           <div className="album text-muted">
                <div className="container">

                <div className="row">
                    {this.state.shoes}
                </div>

                </div>
            </div>
           </Col>
        </Row>
      
      </div>
    );
  }
}

export default ByBrand;
