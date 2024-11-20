import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'
import Loader from '../Loader/Loader'


const Product = () => {
    const [Products, setProducts]= useState()
    const [isLoading, setIsLoading]= useState(false)

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
           setProducts(res.data)
          console.log(res)
          setIsLoading(false);
        }).catch((err)=>{
            console.log(err)
           setIsLoading(false);
        })

    },[])
    // console.log(Products)
    if (!Products) {
      return <div>Loading...</div>; // Show loading while fetching data
    }
    
  return (
    

    <>{
    isLoading?(<Loader/>):(<section className={classes.products_container}>
        {
             (Products?.map((singleProduct) => {
          return <ProductCard renderAdd={true} product={singleProduct} key={singleProduct.id} />
      }))
    }
      </section>)
}
    </>
  );
}

export default Product;
