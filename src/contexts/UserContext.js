import React, { createContext, useState, useReducer } from 'react';
import { rowReducer } from './../reducers/rowReducer'

export const UserContext = createContext();


const UserContextProvider = (props) => {

  const [row, dispatch] = useReducer(rowReducer, 'Antonio');

  const [ search, setSearch ] = useState()

  return (
    <UserContext.Provider value={{row, dispatch, search, setSearch}} >
      {props.children}
    </UserContext.Provider>
  )
}

export default UserContextProvider;





