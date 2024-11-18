import React,{useState,useEffect} from 'react';
import classes from "./ProductDetail.module.css";
import LayOut from '../../components/Layout/LayOut';
import {useParams} from 'react-router-dom'
import axios from 'axios'
import { productUrl } from '../../Api/endPoints';
import ProductCard from '../../components/product/ProductCard';
import Loader from '../../components/Loader/Loader'

const ProductDetail = () => {
   const [product, setproduct] = useState();
   const[isLoading, setIsLoading]= useState(false)
  const {productId}= useParams()
 
  useEffect(()=>{
    axios.get(`${productUrl}/products/${productId}`)
    .then ((res)=>{
       setproduct(res.data);
       setIsLoading(false)
    }).catch((err)=>{
      console.log(err)
      setIsLoading(false)

    })

  },[])
  console.log(product)
  return (
    <LayOut>
      {isLoading? (<Loader/>):(product&& (<ProductCard Product={product} 
      flex={true}
      renderDesc={true}
      />
    ))}
     
     
    </LayOut>
  );
}

export default ProductDetail
