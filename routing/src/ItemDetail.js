import './App.css';
import React from 'react';

function Item({match}) {

  //   useEffect(() => {
  //       console.dir(match);  
  //  }, [])
 
//    const [items, setItems] =  useState([]);
 
//    const fetchItems = async () => {
      
//        setItems(match.params.id);
//    }
  return (
    <div>
     <h1>{match.params.id}</h1>
    </div>
  );
}

export default Item;
