import React from 'react';

function Hello() {

    const sayHello = () => {
        console.log("HEllo");
    };
    return (
        <div className="hello">
            <h2>hello component</h2>
            <button onClick={sayHello}>Say Hello</button>
        </div>
    );


}

export default Hello;