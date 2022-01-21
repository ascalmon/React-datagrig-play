import appConfig from './../appConfig'
import React, { createContext, Component } from 'react';


const getData = (data) => {
  return ( data )
}



const initialValue = {
  teste: 'Antonio',
  newValue: ['one', 'two', 'three'],
  getData: getData,
}

export const UserContext = createContext(initialValue)





