import React from 'react';
import '../App.scss';
import Loaders from "./images/loading.gif";

function Loader() {
  return (

    <div className="loader">
      <img src={Loaders} />
    </div>
  );
}


export default Loader;