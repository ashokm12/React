import React from "react";

class SeachBar extends React.Component {

    render() {

        return (

            <form>
                <input type="text" placeholder="Enter text for search...."/>
                <p>
                 <input type="checkbox"/>
                 {' '}
                 Only show products in stock
                </p>
            </form>
        )

    }
}

export default SeachBar;