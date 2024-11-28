// import { useState } from 'react'
import "./App.css";
import Routing from './Router';
import react ,{useContext, useEffect} from 'react';
import { DataContext } from './components/DataProvider/DataProvider';
import {Type} from "./Utility/action.type";
import {auth} from './Utility/FireBase'




function App() {
  // const [count, setCount] = useState(0)
  const [{user},dispatch] = useContext(DataContext)

  useEffect(()=>{
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch({
          type:Type.SET_USER,
          user:authUser
        })
      }else{
         dispatch({
           type: Type.SET_USER,
           user: null,
         });

      }
    })

  }, [])

  return (
    <>
      <Routing />
      
    </>
  )
}

export default App
