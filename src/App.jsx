import { useState } from 'react'
import "./App.css";
import Header from './components/Header/Header'
import Carousel from './components/Carousel/CarouselEffect';
import Category from './components/Category/Category';
import Product from './components/product/Product';



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Header/>
      <Carousel/>
      <Category/>
      <Product/>
      
    </>
  )
}

export default App
