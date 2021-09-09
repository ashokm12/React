import React from "react";
import SearchBar from './searchBar';
import ProductTable from './productTable';

class FilterableProductTable extends React.Component{

    // constructor(props){
    //     super(props);
    // }

    render() {
        return (
        <div>
            <SearchBar/>
            <ProductTable products={this.props.products}/> 
        </div>
        )
    }
}

export default FilterableProductTable;