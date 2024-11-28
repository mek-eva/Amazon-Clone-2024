import React,{useContext, useState} from 'react'
import classes from "./Payment.module.css";
import LayOut from '../../components/Layout/LayOut';
import { DataContext } from '../../components/DataProvider/DataProvider';
import ProductCard from '../../components/Product/ProductCard';
import {
  useStripe,
  useElements,CardElement} from "@stripe/react-stripe-js";
import CurrencyFormat from '../../components/CurrencyFormat/CurrencyFormat';
import { axiosInstance } from '../../Api/axios';
// import axios from 'axios';
import { ClipLoader } from 'react-spinners';
import { db } from '../../Utility/FireBase';
import { useNavigate } from 'react-router-dom';
import { Type } from '../../Utility/action.type';

const Payment = () => {
  const [{user,basket}, dispatch] = useContext(DataContext);

   const totalItem = basket?.reduce((amount, item) => {
     return item.amount + amount;
   }, 0);

   const total = basket.reduce((amount, item) => {
     return item.price * item.amount + amount;
   }, 0);

   const [cardError, setCardError]= useState(null)
   const [processing, setProcessing] = useState(false)

    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();

    const handleChange = (e)=>{
      e?.error?.message? setCardError(e?.error?.message): setCardError("")};

      const handlePayment= async(e)=>{
        e.preventDefault();

        try{
          setProcessing(true);
          
          // step.1  backend || functions--->contact to the client secret
          const response = await axiosInstance({
            method: "POST",
            url:`/payment/create?total=${total * 100}`,
          });


          // const baseURL = "http://127.0.0.1:5001/clone-3d490/us-central1/api";
          // const response = await axios.post(`${baseURL}/payment/create?total=${total * 100}`);

          const clientSecret = response.data?.clientSecret;

          // step.2 client side(react side) confirmation
          const { paymentIntent } = await stripe.confirmCardPayment(
            clientSecret,{
              payment_method: {
                card:elements.getElement(CardElement),
              },
            }
          );
          console.log(paymentIntent);

          // step.3 after the confirmation---> order firestore database save, then clear basket

          await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket:basket,
            amount:paymentIntent.amount,
            created:paymentIntent.created,
          });

          // empty the basket
          dispatch({
            type:Type.EMPTY_BASKET
          });
    // console.log(basket)

          setProcessing(false);
          navigate("/orders", {state:{msg:"you have placed new order"}})
        }catch (error){
          // console.log(error)
          setProcessing(false)

        }
  }

  return (
    <LayOut>
      {/* header */}
      <div className={classes.payment_header}>
        Checkout ({totalItem}) items{" "}
      </div>
      {/* payment method */}
      <section className={classes.payment}>
        {/* address */}
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>1234 windrush way</div>
            <div>Grayson, GA</div>
          </div>
        </div>
        <hr />

        {/* product */}
        <div className={classes.flex}>
          <h3> Review items and delivery</h3>
          <div>
            {basket?.map((item) => (
              <ProductCard product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />

        {/* card form */}
        <div className={classes.flex}>
          <h3>Payment methods</h3>
          <div className={classes.payment_card_container}>
            <div className={classes.payment_details}>
              <form onSubmit={handlePayment}>
                {/* error */}
                {cardError && (
                  <small style={{ color: "red" }}>{cardError}</small>
                )}
                {/* 
                card Element */}
                <CardElement onChange={handleChange} />

                {/* price */}
                <div className={classes.payment_price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      <p>Total Order | </p>
                      <CurrencyFormat amount={total} />
                    </span>
                  </div>
                  <button type="submit">
                    {processing ? (
                      <div className={classes.loading}>
                        <ClipLoader color="gray" size={12} />
                        <p>Please Wait...</p>
                      </div>
                    ) :"Pay Now"
                    }
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}
    

export default Payment
