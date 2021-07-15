import React, {useState} from 'react';
import Hello from './sayHello';
import Tweet from './Tweet';
import './App.css';

function App() {


  const [isRed, setColor] = useState(false);
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
    setColor(!isRed);
  }

  const [users, setUsers] = useState([
    {name:'Ashok',message: 'I am Ashok', numOfLikes:10},
    {name:'Pragna',message: 'I am Pragna', numOfLikes:20},
    {name:'Saanvi',message: 'I am Saanvi', numOfLikes:30}
  ]);

  return  (
        <div className="app">
          <h1 className={isRed ? "red":""}>Change my color!</h1>
          <button onClick={increment}>Increment</button>
          <h2>{count}</h2>
          <h1>This is app component</h1>
          <Hello/>
          <br/>
          {/* <Tweet name="Ashok" numOfLikes="10" message="This is Ashok"/>
          <Tweet name="Pragna" numOfLikes="20" message="This is Pragna"/>
          <Tweet name="Saanvi" numOfLikes="30" message="This is Saanvi"/>
          <Tweet name="Yashu" numOfLikes="40" message="This is Yashu"/>
          <Tweet/> */}
          {users.map(user => (
              <Tweet name={user.name} message={user.message} numOfLikes={user.numOfLikes} />
          ))}

        </div>
  );
}

export default App;



// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
