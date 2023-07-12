import TextWindow from './TextWindow'
import './App.css';

const App = () => {
  return(
    <div className="app">
      <div className="logo">
        <p className="text" id="click">click</p>
        <p className="text" id="clack">clack.</p>
      </div>
      
      <div className="typebox">
        <TextWindow></TextWindow>
      </div>
      
    </div>
  )
}

export default App;
