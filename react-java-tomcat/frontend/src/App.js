import './App.css'; 
import About from './About';
import Shop from './Shop';
import Nav from './Nav';
import Item from './ItemDetail';
// import { createHistory } from 'history';

import {BrowserRouter as Router,Switch, Route, useRouterHistory} from 'react-router-dom';

function App() {
  var appHref = document.location.pathname;
  console.log(appHref);
  // const appHistory = useRouterHistory(createHistory)({
  //   basename: "/nics"
  // });
  // var path = window.location.pathname;
  // console.log("Path --> "+ path);
  // path = path.substr(0, path.lastIndexOf('/'));
  // console.log("Path --> "+ path);
  return (
    <Router basename={process.env.PUBLIC_URL}>
    <div className="App">
      <Nav/>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/about" component={About}/>
        <Route path="/shop" exact component={Shop}/>
        <Route path="/shop/:id" component={Item} />
       </Switch>
    </div>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Home Page</h1>
    </div>
  );
}

export default App;
