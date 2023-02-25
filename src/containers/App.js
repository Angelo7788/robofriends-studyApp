import React, { useState, useEffect, useReducer } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';

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

  const initialState = { name: 'Angelo', age: 45};
  const [state, dispatch] = useReducer(reducer, initialState);
  
  function reducer(state, action) {
    switch (action.type) {
      case 'add_1': {
        return{
          ...state,
          age: state.age + 1
        };
      }
      case 'subtract_1': {
        return{
          ...state,
          age: state.age - 1
        };
      }
    }
    throw Error('Unknown action: actioon.type');
  }

  const IncreaseAge = ()=> {
    dispatch({ type: 'add_1'});
  }




  
  return !robots.length ?
      <h1 className='tc'>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends Hooks</h1>
          <h2 className='tc'> My name is {state.name} and I am {state.age} </h2>
          <button className='tc' onClick={()=> {
            dispatch({ type: 'add_1'});
          }} >
            Increment age
          </button>
          <button className='tc' onClick={IncreaseAge} >
            Increment age 2
          </button>
          <SearchBox searchChange={onSearchChange}/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
}

export default App;
