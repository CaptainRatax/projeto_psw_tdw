import React from 'react';
import "../App.scss";



function Search1(){
    return(
        <div >
                   <div class="topnav">
             <div class="search-container">
            <form action="/action_page.php">
              <input type="text" placeholder="Search.." name="search" />
           <button className="fa fa-search" type="submit"></button>
        </form>
    </div>
  </div>
        </div>

    
    )
}

export default Search1;