import React, {useState, createContext} from 'react';

export const MovieContext = createContext();

export const MovieProvider = props => {
    const [movies, setMovies] = useState([
        {
            name:"Titanic",
            price: '$10',
            id:1
        },
        {
            name:"Tomorrow War",
            price: '$20',
            id:2
        },
        {
            name:"JathiRathnalu",
            price: '$40',
            id:3
        }
    ]);

    return (
       <MovieContext.Provider value={[movies, setMovies]}>
           {props.children}
       </MovieContext.Provider>

    );
    }