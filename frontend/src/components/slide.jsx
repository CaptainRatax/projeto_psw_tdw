import React from 'react';
import backgroundHome from "../backgroundHome.jpg";
import backgroundHome2 from "../backgroundHome2.jpg";
import backgroundHome3 from "../backgroundHome3.jpg";
import backgroundHome4 from "../backgroundHome4.jpg";

class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
        <div>
       <div class="main-header">
	<div class="slideshow">
		<div class="slideshow__item">
        <img src={backgroundHome} />
		</div>
		<div class="slideshow__item">
        <img src={backgroundHome2} />
		</div>
		<div class="slideshow__item">
        <img src={backgroundHome3} />
		</div>
		<div class="slideshow__item">
        <img src={backgroundHome4} />
		</div>
	</div>
</div>
        </div>
    );
 };
}




export default Slider;