import React from 'react';
import Header from "./header";
import Ted from "../components/ted.png";
import Captain from "../components/captain.png";

class About extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
    
        }
      }
      render(){
        return (
            <div className="background">
                    <Header user={this.props.user} logout={this.props.logout} />
                   
                    <div class="split left1">
  <div class="centered">
    <img src={Ted} />
    <h2>Gonçalo Rodrigues</h2>
    <p> CEO FOUNDER FRONT-ENDER</p>
  </div>
</div>

<div class="split right1">
  <div class="centered">
  <img src={Captain}  /> 
    <h2>Andre Pinto</h2>
    <p>CEO FOUNDER BACK-ENDER</p>
  </div>
</div>
<div className="dashboard"><h1>ABOUT US</h1><p>This website has been developed by Gonçalo Apolinário e André Pinto.<br></br></p></div> 
            </div>
        )
      }
}

export default About;

