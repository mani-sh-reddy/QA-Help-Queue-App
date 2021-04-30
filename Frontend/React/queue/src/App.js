import './App.css';
import { Button } from 'reactstrap';
import React, { useState } from 'react';
import Sort from './Components/Sort';
import Filter from './Components/Filter';
import Create from './Components/Create';
import Queue from './Components/Queue';
import Toggle from './Components/Toggle';


function App() {
  const [modeSelect, setmodeSelect] = useState("Trainee mode");
  const onCheckboxBtnClick = (selected) => {
    setmodeSelect(selected);
  }
  return (
    <div className="App">
      <header className="App-header">
      </header>
      <div className="all_columns">
        <div className="column_one">
          <div className= "create_ticket_div">  
            <Create mode={(modeSelect)}/>
          </div>
          <div  className= "sort_div">
            <Sort/>
          </div>
          <div  className= "filter_div">
            <Filter/>
          </div>
        </div>
        <div className="column_two">
          <div className= "toggle_div">
            {modeSelect}
            <Toggle onCheckboxBtnClick={onCheckboxBtnClick} mode={modeSelect}/>
          </div>
          
            <Queue mode={(modeSelect)}/>
          
        </div>
      </div>
    </div>
  );
}

export default App;
