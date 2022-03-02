import React from 'react';
import Header from "./header";
import SliderProduct from "./sliderproducts"
import { getAllProducts, addToCart } from '../api';


class Product extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      productAdd: false,
      error: false,
    }
  }

  addProduct = (product) => {
    const userId = this.props.user.nMec;

    var product = {
      id: product._id,
      name: product.name,
      stock: product.stock,
      price: product.price,
      category: product.category,
      image: product.image,
      quantity: 1
    }

    addToCart(userId, product).then(resultCart => {
      if (resultCart.success) {
        this.setState({
          productAdd: resultCart.message
        });
      } else {
        this.setState({
          error: resultCart.message
        });
      }
      setTimeout(() => {
        this.setState({
          productAdd: false,
          error: false
        })
      }, 1500);
    })

  }

  render() {

    return (
      <div>

        <Header user={this.props.user} logout={this.props.logout} />
        <div className="homePage">
          <div className="backgroundHome">
            <SliderProduct />
          </div>
        </div>
        <div class="row">
          <div class="column middleProduct">

            {
              this.state.productAdd && (
                <div style={{ color: "green" }} >
                  {this.state.productAdd}
                </div>
              )
            }


            {
              this.state.error && (
                <div style={{ color: "red" }} >
                  {this.state.error}
                </div>
              )
            }

            <div>

              {
                this.state.products.map((product, index) => (
                  product.stock > 0 && (
                    <div class="galleryProduct">
                      <img src={product.image} />
                      <p>{product.name}</p>
                      <p>{product.price}€</p>
                      <p>Stock: {product.stock}</p>
                      <input type="submit" value="Buy" onClick={() => this.addProduct(product)} />
                    </div>
                  )
                ))
              }
            </div>
          </div>
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
}

export default Product;
