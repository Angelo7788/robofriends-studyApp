import React from 'react';

// types of the actions

const ADD_1 = 'ADD_1';
const SUBTRACT_1 = 'SUBTRACT_1';
const CHANGE_NAME = 'CHANGE_NAME';

export {ADD_1, SUBTRACT_1,CHANGE_NAME};

// initial state

export const initialUserState = { name: '....', age: 0};

// reducer function

export function reducer(state, action) {
    switch (action.type) {
      case ADD_1: {
        return{
          ...state,
          age: state.age + 1
        };
      }
      case SUBTRACT_1: {
        return{
          ...state,
          age: state.age - 1
        };
      }
      case CHANGE_NAME: {
        return{
          ...state,
          name: action.newName
        }
      }
    }
    throw Error('Unknown action: action.type');
}



