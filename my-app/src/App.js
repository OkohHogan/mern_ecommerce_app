import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import MainNav  from "./components/nav";
import Footer from "./components/footer";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Signin from "./pages/signin";
import Signup from "./pages/signup";
import ForgotPassword from "./pages/forgot_password";
import WishList from "./pages/wishlist";
import Product from "./pages/product";
import Account from "./pages/account";
import Order from "./pages/order";
import Cart from "./pages/cart";
import CheckOut from "./pages/checkout";
import PostItems from "./components/postItem";
import "./components/style.css"
import Success from "./components/success";
import Error from "./components/error";

const  App = ()  => {
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  return (
   <>
   <Router>
   <MainNav />
        <Routes>
                 <Route exact path='/' element={< Home />}></Route>
                 <Route exact path='/signin' element={ isLoggedIn === "true" ? < Success /> : <Signin />}></Route>
                 <Route exact path='/signup' element={< Signup />}></Route>
                 <Route exact path='/forgot-password' element={< ForgotPassword />}></Route>
                 <Route exact path='/wishlist' element={< WishList />}></Route>
                 <Route exact path='/product/:id' element={< Product />}></Route>
                 <Route exact path='/account' element={< Account />}></Route>
                 <Route exact path='/order-history' element={< Order />}></Route>
                 <Route exact path='/cart' element={< Cart />}></Route>
                 <Route exact path='/checkout' element={< CheckOut />}></Route>
                 <Route exact path='/post' element={< PostItems />}></Route>
                 <Route exact path='/success' element={< Success />}></Route>
                 <Route exact path='/error' element={< Error />}></Route>
          </Routes> 
          <Footer />  
   </Router>
   </>  
  );
}

export default App;