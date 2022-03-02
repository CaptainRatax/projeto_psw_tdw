import React from 'react';
import { Link } from 'react-router-dom'
import PageError from "./images/background404.png";



function PageNotFound(props) {
  return (
    <div class="row">
      <div class="column side">

      </div>

      <div class="column middle">
        <div className="page1">
          <div className="image404">
            <img src={PageError} />
          </div>
        </div>
        <div className="page1">
          <h1>ERROR #404</h1>
          <h2>COFE NOT FOUND</h2>
          <b><p>You can return to our Home Page<br>
          </br>if you can't find what you looking for.</p></b>
          {
            props.isLogged ? (<Link to="/" className="btnHome">Home</Link>) : (<Link to="/login" className="btnHome">Back</Link>)
          }


        </div>
      </div>

      <div class="column side">

      </div>
    </div>

  )
}

export default PageNotFound;