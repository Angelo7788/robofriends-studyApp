import React, { useState, useEffect, useReducer } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import './App.css';
import {reducer, initialUserState} from '../reducer/userReducer';
import {ADD_1, SUBTRACT_1,CHANGE_NAME} from '../reducer/userReducer';
import UserInfo from '../components/UserInfo';
import FirebaseData from '../components/FirebaseData';

function App() {

  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  // reducer

  const [state, dispatch] = useReducer(reducer, initialUserState);

  // reducer cases functions

  const IncreaseAge = ()=> {
    dispatch({ type: ADD_1});
  }

  const DecreaseAge = ()=> {
    dispatch({ type: SUBTRACT_1});
  }

  const onChangeName = (newName)=> {
    dispatch({ 
      type: CHANGE_NAME,
      newName: newName
    });
  }

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

  
  
  return !robots.length ?
      <h1 className='tc'>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends Hooks</h1>
          <UserInfo
            name= {state.name}
            age= {state.age}
            IncreaseAge={IncreaseAge}
            DecreaseAge={DecreaseAge}
            onChangeName={onChangeName}
          />
          <SearchBox searchChange={onSearchChange}/>
          <FirebaseData/>
          <Scroll>
            <CardList robots={filteredRobots} />
          </Scroll>
        </div>
      );
}

export default App;
