import React, {useContext} from 'react';
import { MovieContext } from './MovieContext';


const Movie = ({name,price}) => {

  return (
    <nav>
        <h3>{name}</h3>
        <p>{price}</p>
    </nav>
  );
}

export default Movie;
