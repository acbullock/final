import axios from "axios";

export default {
  // Gets all books
  getShoes: function() {
    return axios.get("/api/shoes");
  },
  // Gets the book with the given id
  getShoe: function(id) {
    return axios.get("/api/shoes/" + id);
  },
  updateShoe: function(shoeData){
    return axios.put("/api/shoes", shoeData);
  },
  // Deletes the book with the given id
  deleteShoe: function(id) {
    return axios.delete("/api/shoes/" + id);
  },
  // Saves a book to the database
  saveShoe: function(shoeData) {
    return axios.post("/api/shoes", shoeData);
  },
  getByBrand: function(brand){
    return axios.get("/api/brands/"+brand) ;
  },
  Login: function(u, p){
    return axios.post("/api/login", {username:u, password:p});
  },
  update: function(user){
    return axios.put("/api/login", user);
  }
};
