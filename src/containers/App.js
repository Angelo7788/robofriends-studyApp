import React, { useState, useEffect, useReducer } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import {reducer, initialUserState} from '../reducer/userReducer';
import {IncreaseAge, DecreaseAge, onChangeName} from '../reducer/userReducer';

function App() {

  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  // lifecycle hook useEffect

  useEffect(()=> {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(response=> response.json())
        .then(users => setRobots(users));
  },[])

  // [] with no dependecies, it will run only at first render of the App or 
  // if we put a dependency it will run every time the dep. changes

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredRobots = robots.filter(robot =>{
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    })

  // reducer

  const [state, dispatch] = useReducer(reducer, initialUserState);
  const [newName, setNewname] = useState('');
  
  return !robots.length ?
      <h1 className='tc'>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends Hooks</h1>
          <h2 className='tc'> My name is {state.name} and I am {state.age} </h2>
          <button className='tc' onClick={IncreaseAge} >
            Increment age
          </button>
          <button className='tc ma2' onClick={DecreaseAge} >
            Decrease age
          </button>
            <div>
                <h2 className='tc'>Type the new name</h2>
                <input className='tc ma2'
                  value={newName}
                  onChange={(event)=> {
                    setNewname(event.target.value)
                  }}
                />
                <button className='ma2' onClick={onChangeName}>Change name</button>
            </div>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
}

export default App;
