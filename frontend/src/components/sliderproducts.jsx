import React from 'react';
import backgroundHome from "../backgroundProduct.jpg";
import backgroundHome2 from "../backgroundHome2.jpg";
import backgroundHome3 from "../backgroundHome3.jpg";


class SliderProduct extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    return (
    <div>
    <div className="background">
    <div class="containe">
	<div data-am-gallery="3 next-prev-navigation">
		<input type="radio" name="gallery" id="img-1" checked />
		<input type="radio" name="gallery" id="img-2" />
		<input type="radio" name="gallery" id="img-3" />
   

	
		<div class="images">
			<img class="image" src={backgroundHome}></img>
			<img class="image" src={backgroundHome2}></img>
			<img class="image" src={backgroundHome3}></img>
		</div>
		
	
		<div class="navigation">
			<label class="dot" for="img-1"></label>
			<label class="dot" for="img-2"></label>
			<label class="dot" for="img-3"></label>
 
		</div>
		

		<div class="prev-container">
			<label class="prev" for="img-1"></label>
			<label class="prev" for="img-2"></label>
			<label class="prev" for="img-3"></label>
            
		</div>
		<div class="next-container">
			<label class="next" for="img-1"></label>
			<label class="next" for="img-2"></label>
			<label class="next" for="img-3"></label>
         
		</div>
		
	</div>
	
</div>
        </div>
        </div>
    );
 };
}

export default SliderProduct;