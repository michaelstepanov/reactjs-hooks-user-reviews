import * as React from 'react';
import {createContext} from "react";
import {useReducer} from "react";
import {initialState, reducer} from "../store/reducer";

export const DataContext = createContext();

export const DataProvider = ({children}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DataContext.Provider value={{state, dispatch}}>
      {children}
    </DataContext.Provider>
  );
};
