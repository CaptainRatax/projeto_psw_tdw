import React from 'react';
import Header from "./header";
import UserImg from "./User.png";
import { NavLink } from 'react-router-dom';
import { createProduct, deleteProductId, editProduct, getAllProducts, getProductById } from '../api';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      newProduct: {
        name: "",
        stock: "",
        price: "",
        category: "",
        image: ""
      },
      edit: false,
      newProductSuccess: false,
      error: false,
      deleteOk: false
    }
  }

  handlerNew = (e) => {
    var product = this.state.newProduct;
    product[e.target.name] = e.target.value;
    this.setState({ newProduct: product });
  }

  handlerNewSubmit = (e) => {
    e.preventDefault();
    if (!this.state.edit) {
      createProduct(this.state.newProduct).then(result => {
        if (result.ok) {
          this.setState({
            newProductSuccess: true,
            error: false
          });
          getAllProducts().then(result => {
            this.setState({
              products: result
            })
          })
          document.getElementById("formSubmitProduct").reset();
          setTimeout(() => {
            this.setState({
              newProductSuccess: false
            });
          }, 1500);
        } else {
          this.setState({
            error: true,
            newProductSuccess: false
          });
        }
      });
    }else{
      console.log(this.state.newProduct);
      editProduct(this.state.newProduct).then(result => {
        if (result.ok) {
          this.setState({
            newProductSuccess: true,
            error: false
          });
          getAllProducts().then(result => {
            this.setState({
              products: result
            })
          })
          document.getElementById("formSubmitProduct").reset();
          setTimeout(() => {
            this.setState({
              newProductSuccess: false
            });
          }, 1500);
        } else {
          this.setState({
            error: true,
            newProductSuccess: false
          });
        }
      });
    }
  }

  editProduct = (id) => {
    document.getElementById("title").innerHTML = "Edit Product";
    getProductById(id).then(result => {
      this.setState({
        edit: true,
        newProduct: {
          _id: result._id,
          name: result.name,
          stock: result.stock,
          price: result.price,
          category: result.category,
          image: result.image
        }
      })
    })
  }

  deleteUser = (id, index) => {
    if (window.confirm("Are you sure you want to delete?")) {
      var products = this.state.products;
      deleteProductId(id).then(result => {
        if (result.ok) {
          products.splice(index, 1);
          this.setState({
            products,
            deleteOk: true
          });
          setTimeout(() => {
            this.setState({
              deleteOk: false
            });
          }, 1500);
        }
      });
    };
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} logout={this.props.logout} />
        <div className="dashboard"><h1>PRODUCT SETTINGS<p>Use your admin powers to edit this Website</p></h1>
          <NavLink className="navD 	fas fa-arrow-alt-circle-left" exact to="/dashboard"> </NavLink>
          <NavLink className="navD fa fa-user" exact to="/dashboard1"> </NavLink>
          <a href="/history" className="navD fa fa-history" >  </a>
          <NavLink className="navD fas fa-sign-in-alt" to="/" onClick={() => this.props.logout()}>   </NavLink>
        </div>
        <div className="dashR">
          <h1>List of Products </h1> 
          {
            this.state.deleteOk && (
              <div style={{ color: "red" }}>
                Product deleted!
              </div>
            )
          }
          {
            this.state.products.map((product, index) => (
              <div class="container1">
                <img src={UserImg} />
                <p><span>{product.name}</span> {product.stock}</p>
                <p>{product.price}€</p>
                <p>{product.category}</p>
                <button onClick={(e) => this.editProduct(product._id)}>Edit</button>
                <button onClick={() => this.deleteUser(product._id, index)} >Delete</button>
              </div>
            ))
          }


        </div>

        <div className="dash">
          <form id="formSubmitProduct" onSubmit={(e) => this.handlerNewSubmit(e)}>
            <h3 id="title">Add Products</h3>
            <label for="name"> Name</label>
            <input type="text" id="name" name="name" placeholder="Products name.." value={this.state.newProduct.name} onChange={(e) => this.handlerNew(e)} />

            <label for="number"> Stock</label>
            <input type="text" id="stock" name="stock" placeholder="Products Stock.." value={this.state.newProduct.stock} onChange={(e) => this.handlerNew(e)} />

            <label for="password"> Price</label>
            <input type="text" id="price" name="price" placeholder="Products Price.." value={this.state.newProduct.price} onChange={(e) => this.handlerNew(e)} />

            <label for="image"> Image</label>
            <input type="text" id="image" name="image" placeholder="Image Url.." value={this.state.newProduct.image} onChange={(e) => this.handlerNew(e)} />

            <label for="category">Category</label>
            <select id="category" name="category" value={this.state.newProduct.category} onChange={(e) => this.handlerNew(e)}>
              <option value="null">-----Select-----</option>
              <option value="Chocolates">Chocolates</option>
              <option value="Drinks">Drinks</option>
              <option value="Fruits">Fruits</option>
              <option value="Cakes">Cakes</option>
              <option value="Sanwiches">Sandwiches</option>
              <option value="Snacks">Snacks</option>
              <option value="Others">Others</option>
            </select>

            <input type="submit" value="Confirm" />
            

            {this.state.error && (
              <div style={{ color: "red" }} >
                Purchase Product Error!
              </div>
            )}

            {this.state.newProductSuccess && (
              <div style={{ color: "green" }} >
                Purchase Product With Sucess!
              </div>
            )}
            <input type="reset"  value="Clear"/>
          </form>

        </div>

    </div>
    );
  }

  componentDidMount() {
    getAllProducts().then(result => {
      this.setState({
        products: result
      })
    })
  }

};

export default Dashboard;