import React from 'react';
import Header from "./header";
import CartImg from "./images/backgroundCart.png";

import { getCartProducts, editCartProduct, deleteCartProduct,addProductsHistory } from '../api';

class Cart extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			products: [],
			quantity: "",
			error: [],
			success: [],
			getTotalPrice:0
		}
	}

	getTotalPrice = () => {
		var totalPrice = 0;
		this.state.products.forEach(product => {
		  totalPrice += product.price;
		});
		this.setState({
		  totalPrice
		});
	  };

	setQuantity = (e, index) => {
		var product = this.state.products[index];
		product.quantity = e.target.value
	}

	editProduct = (product, index) => {
		if (product.quantity > this.state.products[index].stock) {
			var product = this.state.products[index];
			product.quantity = product.stock;
			var error = this.state.error;
			error[index] = "Quantity exceeded...";
			this.setState({
				error
			})

			setTimeout(() => {
				error[index] = "";
				this.setState({
					error
				})
			}, 1500);
		} else {
			editCartProduct(this.props.user.nMec, this.state.products).then(resultCart => {
				if (resultCart.success) {
					this.getTotalPrice();
					var success = this.state.success;
					success[index] = "Edited with success";
					this.setState({
						success
					})

					setTimeout(() => {
						success[index] = "";
						this.setState({
							success
						})
					}, 1500);
				}
			})
		}



	}

	deleteProduct = (index) => {
		if (window.confirm("Are you sure you want to delete this product?")) {
			var products = this.state.products;
			products.splice(index, 1);
			deleteCartProduct(this.props.user.nMec, products).then(resultCart => {
				if (resultCart.success) {
					this.setState({
						products
					});
				}
			})
		}
	}


	buyProduct = () => {
		const products = this.state.products;
		const userId = this.props.user.nMec;
		const totalPrice = this.state.totalPrice;
		const data = {
		  products,
		  userId,
		  totalPrice
		};
		console.log(data)
		addProductsHistory(userId, data).then(resultHistory => {
		  if (resultHistory.success) {
			this.setState({
			  successBuy: true
			});

			setTimeout(() => {
			  this.props.history.push("/product");
			}, 1000);
	
	
		  } else {
			this.setState({ errors: resultHistory.message });
		  }
		});
	  };  



	render() {
		return (
			<div className="background">
				<Header user={this.props.user} logout={this.props.logout} />
				<div className="dashboard"><h1>Shopping Cart</h1></div>

				{this.state.totalPrice>0 && 
				<div>
					<button onClick={()=>this.buyProduct()}>Checkout {this.state.totalPrice}€</button>
				</div>}

				{
					this.state.products.length>0 ?
						(
							this.state.products.map((product, index) => (
								<div class="galleryProductCart">
									<img src={product.image} />
									<p>Name: {product.name}</p>
									<p>Price: {product.price}€</p>
									<p>Stock: {product.stock}</p>
									<p>Quantity: <input type="text" defaultValue={product.quantity} style={{ width: "80px" }} onChange={(e) => this.setQuantity(e, index)} /></p>
									<input type="submit" value="Edit" onClick={() => this.editProduct(product, index)} />
									<input type="submit" value="Delete" onClick={() => this.deleteProduct(index)} />
									{
										this.state.error[index] && (
											<div style={{ color: "red", textAlign: "center" }} >
												{this.state.error[index]}
											</div>
										)
									}
									{
										this.state.success[index] && (
											<div style={{ color: "green", textAlign: "center" }} >
												{this.state.success[index]}
											</div>
										)
									}
								</div>
							))
						)
						:
						(
							 <div className="CartPage">
						    <div className="image404"> 
							<img src={CartImg} />
						  </div>
						  </div>
						)
				}
			</div>	
			
		)
	}

	componentDidMount() {
		getCartProducts(this.props.user.nMec).then(resultCart => {
			if (resultCart.success) {
				this.setState({
					products: resultCart.products.products
				})
				 this.getTotalPrice();
			}
		});
	}
}

export default Cart;