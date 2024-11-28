import React,{useState, useContext} from 'react'
import classes from './signup.module.css'
import {Link, useNavigate, useLocation} from "react-router-dom"
import {auth} from '../../Utility/FireBase';
import {ClipLoader} from 'react-spinners';

import {signInWithEmailAndPassword,createUserWithEmailAndPassword } from "firebase/auth"
import { DataContext } from '../../components/DataProvider/DataProvider';
import {Type} from "../../Utility/action.type";



const Auth = () => {
  const [email, setEmail]= useState("");
  const [password, setPassword] = useState("");
  const[error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn:false,
    signUp:false
  })

  const [{user}, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const navStateData= useLocation();
  // console.log(navStateData)


  const authHandler=async(e)=>{
    e.preventDefault();
    // console.log(e.target.name)
    if(e.target.name == "signIn"){

      // firebase auth 
      setLoading({...loading, signIn:true})
      signInWithEmailAndPassword(auth, email, password).then((userInfo)=>{
        dispatch({
          type: Type.SET_USER,
          user:userInfo.user,
        });

         setLoading({ ...loading, signIn: false});
         navigate(navStateData?.state?.redirect || "/");

      }).catch((err)=>{
         setError(err.message);
         setLoading({...loading, signIn:false})
      });
    }else{
      setLoading({...loading, signUp:true})
      createUserWithEmailAndPassword(auth, email, password).then((userInfo)=>{

         dispatch({
           type: Type.SET_USER,
           user: userInfo.user,
         });
         setLoading({...loading, signUp:false});
          navigate(navStateData?.state?.redirect || "/");

      }).catch((err)=>{
          setError(err.message);
          setLoading({...loading, signUp:false})

      });

    }
  }


  return (
    <section className={classes.login}>
      {/* logo */}
      <Link to={"/"}><img src="https://pngimg.com/uploads/amazon/amazon_PNG21.png" alt="" />
      </Link>

      {/* form */}
      <div className={classes.login_container}>
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
          <small 
              style={{
                padding: "5px",
                textAlign: "center",
                color: "red",
                fontWeight: "bold",
              }} >
                {navStateData?.state?.msg}
              </small>
        )

        }

        <form action="">
          <div>
            <label htmlFor="email">E-mail</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" />
            </div>

            <div>
            <label htmlFor="password">Password</label>
            <input value={password} onChange={(e)=>setPassword(e.target.value)} type="password" id="password" />

          </div>
          <button type="submit" onClick={authHandler}
           name ="signIn" className={classes.login_signInButton}>
            {loading.signIn?(<ClipLoader color="#000" size={15}></ClipLoader>):("sign In")}
            </button>
        </form>

        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of use & sale. please see our privacy Notice, our Cookies Notice and our Interest-Based Ads Notice.
        </p>
        {/* create account button */}
        <button type="submit"
        name="signUp"
        onClick={authHandler} className={classes.login_registerButton}>
          
          {loading.signUp?(<ClipLoader color="#000" size={15}></ClipLoader>):("Create Your Amazon Account")}
            </button>

        {error &&
        <small style={{paddingTop: "5px", color: "red"}}>
          {error}
        </small>
          
           }

      </div>
    </section>
  )
}

export default Auth;

