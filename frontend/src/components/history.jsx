import React from 'react';
import UserImg from "./User.png";
import Header from "./header";
import { getHistoryById } from "../api";

class History extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: []
    }
  }
  render() {
    return (
      <div className="background">
        <Header user={this.props.user} logout={this.props.logout} />
        <div className="dashboard"><h1>History Cart</h1></div>
        {(this.props.user.isAdmin && <div><input id="nMecSearch" placeholder="Mecanographic Number"></input><button onClick={()=>this.searchHistory()}>Search</button></div>)}
        {
          (this.state.history != undefined &&
            this.state.history.map((cart, index) => (
              <div key={index} class="container2">
                <h2>{this.getDate(cart.createdAt)}</h2>
                {
                  cart.products.map((product, _index) => (
                  <p><span>{product.name}</span><br/>Quantity: {product.quantity}<br/>{product.price}€</p>
                  ))
                }
              </div>
            ))
          )
        }
        {
          (this.state.history === undefined &&
            <h1>No history found</h1>
          )
        }
      </div>
    )
  }

  searchHistory(){
    var nMec = document.getElementById("nMecSearch").value;
    getHistoryById(nMec).then(result => {
      console.log(result)
      this.setState({
        history: result.resultHistory
      })
    })
  }

  getDate(date) {
    var fulldate = new Date(date).toISOString();
    var date = fulldate.split('T')[0];
    date = date.split("-")[2] + "/" + date.split("-")[1] + "/" + date.split("-")[0]
    return date;
  }

  componentDidMount() {
    getHistoryById(this.props.user.nMec).then(result => {
      console.log(result)
      this.setState({
        history: result.resultHistory
      })
    })
  }
}

export default History;