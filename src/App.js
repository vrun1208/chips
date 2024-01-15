//import logo from './logo.svg';
import './App.css';
import ChipComponent from './components/chip';


const items = ['Apple', 'Banana', 'Cherry', 'Grapes', 'Orange', 'Pineapple'];

function App() {
  return (
    <div className="App">
       <h1>Chips component!</h1>
       <ChipComponent options={items}/>
    </div>
  );
}

export default App;
