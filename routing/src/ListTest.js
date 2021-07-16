import './App.css';
function ListItem(props) {
  return (
    <li>{props.value}</li>
  );
}
function NumberList(props) {
  return (
    <div>
      <ul>
        {
        props.numbers.map((number) => 
          <ListItem key={number.toString()} value={number} />
        )
        }
      </ul>
    </div>
  );
}

function App() {
  const numbers =[1,2,3,4,5];
  return (
    // <NumberList numbers={numbers}/>
    <div>
      <h1>App page</h1>
    </div>
  );
}

export default App;
