import React,{useContext} from 'react'
import classes from './Header.module.css'
import {Link} from 'react-router-dom'
import LowerHeader from './LowerHeader';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";
import { DataContext } from '../DataProvider/DataProvider';
import {auth} from "../../Utility/FireBase"


const Header = () => {

  const [{user,basket},dispatch]=useContext(DataContext)
  const totalItem = basket?.reduce((amount,item)=>{
    return item.amount + amount
  },0)

  return (
    <section className={classes.fixed}>
      <section>
        <div className={classes.header_container}>
          {/* {logo section} */}
          <div className={classes.logo_container}>
            <Link to="/">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amazon logo"
              />
            </Link>

            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <SlLocationPin />
              </span>
              <div>
                <p>Deliver to</p>
                <span>Grayson,GA</span>
              </div>
            </div>
          </div>

          {/* search section */}
          <div className={classes.search}>
            <select name="" id="">
              <option value=""> All</option>
            </select>
            <input type="text" />
            <BsSearch size={40} />
          </div>
          {/* other section */}
          <div className={classes.order_container}>
            <Link to="" className={classes.language}>
              <img
                src="https://image.shutterstock.com/image-photo/american-flag-usa-design-united-260nw-2152406627.jpg"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </Link>

            <Link to={!user && "/Auth"}>
              <div>
                {user ? (
                  <>
                    <p> Hello{user?.email?.split("@")[0]}</p>
                    <span onClick={()=>auth.signOut()}>Sign Out</span>
                  </>
                ) : (
                  <>
                    <p> Hello, Sign In</p>
                    <span>
                      Account <br />& Lists
                    </span>
                  </>
                )}
              </div>
            </Link>

            <Link to="/orders">
              <p>Returns</p>
              <span>& Orders</span>
            </Link>
            <Link to="/Cart" className={classes.cart}>
              <BiCart size={30} />
              <span>{totalItem}</span>
            </Link>
          </div>
        </div>
      </section>
      <LowerHeader />
    </section>
  );
}

export default Header



