import React from 'react'
import classes from './Header.module.css'
import LowerHeader from './LowerHeader';
import { BsSearch } from "react-icons/bs";
import { BiCart } from "react-icons/bi";
import { SlLocationPin } from "react-icons/sl";


const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          {/* {logo section} */}
          <div className={classes.logo_container}>
            <a href="#">
              <img
                src="https://pngimg.com/uploads/amazon/small/amazon_PNG11.png"
                alt="amazon logo"
              />
            </a>

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
            <BsSearch size={25} />
          </div>
          {/* other section */}
          <div className={classes.order_container}>
            <a href="" className={classes.language}>
              <img
                src="https://image.shutterstock.com/image-photo/american-flag-usa-design-united-260nw-2152406627.jpg"
                alt=""
              />

              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <a href="">
              <p>Hello,Sign In</p>
              <span>Account & Lists</span>
            </a>

            <a href="">
              <p>returns</p>
              <span>& orders</span>
            </a>
            <a href="" className={classes.cart}>
              <BiCart size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader/>
    </>
  );
}

export default Header


