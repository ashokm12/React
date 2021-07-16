import './App.css';
import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';

function Shop() {

  useEffect(() => {
       fetchItems();     
  }, [])

  const [items, setItems] =  useState([]);

  const fetchItems = async () => {
      const data = await fetch('https://fortnite-api.theapinetwork.com/store/get');
      console.log( data);

      const data1 = await data.json();
      console.log(data1.data);
      setItems(data1.data);
  }
  return (
    <div>
      
        {items.map((item) => 
        <Link to={`/shop/${item.item.name}`}> <h4 key={item.itemId}> {item.item.name}</h4></Link>
        )}
       
    </div>
  );
}

export default Shop;
