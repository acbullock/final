
import React, { Component } from "react";
import {Link} from 'react-router-dom';
import { Card, Icon, Carousel,Row, Col, Button, Modal, Input, Form } from "antd";
import API from "../../utils/API";
const FormItem = Form.Item;
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shoeData:{},
      visible: false,
      shoes:[],
      currShoe:[],
      currPrice:"",
      currSynopsis:"",
      currName:"",
      currId:"",
      currBrand:""
      
    };
    this.deleteShoe = this.deleteShoe.bind(this);
    this.editShoe = this.editShoe.bind(this);
    this.showModal = this.showModal.bind(this);
    this.handleOk = this.handleOk.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleOk = this.handleOk.bind(this);
}
showModal(id){
  this.setState({visible:true, currId: id});
  
  API.getShoe(id).then(shoe=>{
    this.setState({currBrand: shoe.data.brand, currName:shoe.data.name, currPrice: shoe.data.price, currSynopsis: shoe.data.synopsis});
    let curr = (
      
      <div>
        {/* <h3>{shoe.data.name}</h3>
        <p>{shoe.data.synopsis}</p>
        <p>{shoe.data.price}</p> */}
        
        
      </div>
    );
    this.setState({currShoe: curr});
    
  });
}
handleChange(e){
//  alert(JSON.stringify(e.target.value, null, 2))
  const {name, value} = e.target;

    this.setState({[name]:value});

}
handleOk(e){
  // alert(e.target.id);
  API.getShoe(e.target.id).then(shoe=>{
    let updated = shoe.data;
    updated.brand = this.state.currBrand;
    updated.name = this.state.currName;
    updated.price = this.state.currPrice;
    updated.synopsis = this.state.currSynopsis;
    API.updateShoe(updated).then(shoe=>{
      API.getShoes().then(shoe=>{
        this.setState({shoeData: shoe.data});
        let shoeImages = shoe.data.map((shoe, index)=>(
          
            
            
            <Card key={shoe._id}>
            <Row type="flex" justify="center">
            <Col span={24}>
            <Button type="danger" shape="circle" className="btn" onClick={()=> this.deleteShoe(shoe._id)}><Icon type="delete"/></Button>
          <Button type="info" shape="circle" id={shoe._id} className="btn" onClick={()=>this.showModal(shoe._id)}><Icon type="edit"/></Button>
          </Col><Col>
            <a href={"/shoes/"+shoe._id}><div key={index}>
          <img alt="Thumbnail [100%x280]" style={{"width": "280px"}} src={shoe.images[0]}/>
          <p className="card-text">{shoe.name}</p>
          <p className="card-text">{shoe.price}</p>
          <p className="card-text">{shoe.synopsis}</p>
          </div></a></Col>
          </Row></Card>
            
          
        ));
        
        this.setState({shoes: shoeImages})
      })
      
    });
  });
  this.setState({
    visible: false,
  });
}
handleCancel(e){
  console.log(e);
  this.setState({
    visible: false
  });
} 


  deleteShoe(id){
    API.deleteShoe(id).then(shoe=>{
      API.getShoes().then(shoes=>{
        this.setState({shoeData: shoes.data});
        let shoeImages = shoes.data.map((shoe, index)=>(
          
            
            
            <Card key={shoe._id}>
            <Row type="flex" justify="center">
            <Col span={24}>
            <Button type="danger" shape="circle" className="btn" onClick={()=> this.deleteShoe(shoe._id)}><Icon type="delete"/></Button>
          <Button type="info" shape="circle" className="btn"><Icon type="edit"/></Button>
          </Col><Col>
            <a href={"/shoes/"+shoe._id}><div key={index}>
          <img alt="Thumbnail [100%x280]" style={{"width": "280px"}} src={shoe.images[0]}/>
          <p className="card-text">{shoe.name}</p>
          <p className="card-text">{shoe.price}</p>
          
          </div></a></Col>
          </Row></Card>
            
          
        ));
        
        this.setState({shoes: shoeImages})
      });
      
    })
          
        
     
  }
  editShoe(id){
   API.getShoe(id).then(shoe=>{
     alert(JSON.stringify(shoe, null, 2))
   });
  }
  componentDidMount() {
    API.getShoes().then(shoes=>{
      this.setState({shoeData: shoes.data});
      let shoeImages = shoes.data.map((shoe, index)=>(
        
          
          
          <Card key={shoe._id}>
          <Row type="flex" justify="center">
          <Col span={24}>
          <Button type="danger" shape="circle" className="btn" onClick={()=> this.deleteShoe(shoe._id)}><Icon type="delete"/></Button>
        <Button type="info" shape="circle" id={shoe._id} className="btn" onClick={()=>this.showModal(shoe._id)}><Icon type="edit"/></Button>
        </Col><Col>
          <a href={"/shoes/"+shoe._id}><div key={index}>
        <img alt="Thumbnail [100%x280]" style={{"width": "280px"}} src={shoe.images[0]}/>
        <p className="card-text">{shoe.name}</p>
        <p className="card-text">{shoe.price}</p>
        <p className="card-text">{shoe.synopsis}</p>
        </div></a></Col>
        </Row></Card>
          
        
      ));
      
      this.setState({shoes: shoeImages})
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
        <Link to="/checkout" className="nav-link"><Icon type="shopping-cart"/>Cart</Link>
        </li>
        <li className="nav-item">
        <Link to="/admin" className="nav-link active"><Icon type="tool" /> Admin</Link>
        </li>
      </ul>
      
    </div>
  </nav>
  <br/>
       <Row type="flex" justify="center">
         <Col>
         <h1>Welcome Admin</h1><br/>
         <Button type="info" shape="circle" className="btn"><Icon type="plus"/></Button> Add Shoe
         <br/>
         <br/>
         </Col>
         </Row>
         <Row type="flex" justify="center">
         <Col span={16}>
         {this.state.shoes}
         </Col>
       </Row>
      
       <Modal
          title="Edit Shoe"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" size="large" onClick={this.handleCancel}>Cancel</Button>,
            <Button key="submit" type="primary submit" size="large" id={this.state.currId} onClick={this.handleOk} loading={this.state.loading} >
              Submit
            </Button>,
          ]}
        >
          <Form>
          <FormItem>
            <label>Shoe Name</label>
            <Input value={this.state.currName} name="currName" onChange={this.handleChange}></Input>
          </FormItem>
          <FormItem>
            <label>Shoe Brand</label>
            <Input value={this.state.currBrand} name="currBrand" onChange={this.handleChange}></Input>
          </FormItem>
          <FormItem>
            <label>Synopsis</label>
            <Input value={this.state.currSynopsis} name="currSynopsis" onChange={this.handleChange}></Input>
          </FormItem>
          <FormItem>
            <label>Price</label>
            <Input value={this.state.currPrice} name="currPrice" onChange={this.handleChange}></Input>
          </FormItem>
        </Form>
        </Modal>

  
    </div>
     
    );
  }
}

export default Admin;
