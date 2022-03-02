import React from 'react';
import contact from "../contact.jpg";
import Header from "./header";

class Contact extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
    
        }
      }
      render(){
        return (
            <div className="background">
                    <Header user={this.props.user} logout={this.props.logout} />
<div className="containerContact">
  <div className="row">
    <div className="homePage">
    <img src={contact} />
    </div>
    <div className="column">
      <form action="/action_page.php">
        <label for="fname">Name</label>
        <input type="text" id="name" name="name" placeholder="Your Name.." />
        <label for="number">Number</label>
        <input type="text" id="number" name="number" placeholder="Your Number.." />
        <label for="lname">Mensagem</label>
        <input type="text" id="Mensagem" name="Mensagem" placeholder="Your Mensagem.." />
        <input type="submit" value="Submit" />
      </form>
    </div>
    </div>
  </div>
</div>

        )
      }
}

export default Contact;