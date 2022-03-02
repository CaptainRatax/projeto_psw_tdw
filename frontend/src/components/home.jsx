import React from 'react';
import Header from "./header";
import Slider from './slide';
import Contact from './contact';




class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
      <div>
        <Header user={this.props.user} logout={this.props.logout} />
        <div className="homePage">
          <Slider />
        </div>

      </div>
    );
  };
  componentDidMount() {
    console.log(this.props.user)
  }
}
export default Home;