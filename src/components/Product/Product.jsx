import React, { useEffect, useState } from 'react'
import axios from 'axios'
import ProductCard from './ProductCard'
import classes from './Product.module.css'


const Product = () => {
    const [Products, setProducts]= useState()
    const [isLoading, setIsLoading]= useState(false)

    useEffect(()=>{
        axios.get("https://fakestoreapi.com/products")
        .then((res)=>{
           setProducts(res.data)
          setIsLoading(false);
        }).catch((err)=>{
            console.log(err)
           setIsLoading(false);
        })

    },[])
    console.log(Products)

  return (

    <>{
    isLoading?(<Loader/>):(<section className={classes.products_container}>
        {
            Products?.map((singleProduct) => {
          return <ProductCard Product={singleProduct} key={singleProduct.id} />
      })
    }
      </section>)
}
    </>
  );
}

export default Product
