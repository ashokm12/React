import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals'; 
import FilterableProductTable from './filterableProductTable';
import ParentComponent from './ParentComponent';
import PropTypes from 'prop-types';
import ComponentExamplePropType from './CompoentExamplePropType';

const PRODUCTS= [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

// Validating prop types
ComponentExamplePropType.propTypes = {
  arrayProp: PropTypes.array,
  stringProp: PropTypes.string,
  numberProp: PropTypes.number,
  boolProp: PropTypes.bool,
}

// Creating default props
ComponentExamplePropType.defaultProps = {

  arrayProp: ['Ram', 'Shyam', 'Raghav'],
  stringProp: "GeeksforGeeks",
  numberProp: 10,
  boolProp: true,
}


ReactDOM.render(
  <React.StrictMode>
    {/* <App /> */}
    <FilterableProductTable products={PRODUCTS}/>
    <ParentComponent />
    <ComponentExamplePropType/>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
