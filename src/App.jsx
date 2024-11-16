import { useState } from 'react'
import "./App.css";
import Header from './components/Header/Header'
import Carousel from './components/Carousel/CarouselEffect';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Carousel/>
      
    </>
  )
}

export default App
