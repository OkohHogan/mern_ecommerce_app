import React, {useEffect, useState} from "react";
import {Container, Row, Col, Dropdown, Button } from 'react-bootstrap';
import FeatherIcon from 'feather-icons-react';
import { Link } from "react-router-dom";
import CartBar from "./cart_menu";
import cartToggle from "./cartToggleAction";
import { useNavigate } from "react-router-dom";

function NavCategories(data) {
  return (
    <> 
        <li key={data._id}>
        <Link to="">{data.title}</Link>
        </li>
    </>
  )
}

function MainNav() {


  const navigate = useNavigate();
  const isLoggedIn = window.localStorage.getItem("loggedIn");
  const [records, setRecords] = useState([]);
  useEffect(() => {
   async function getRecords() {
     const response = await fetch("https://nelly-ecommerce-app.onrender.com/categories");
     if (!response.ok) {
       const message = `An error occurred: ${response.statusText}`;
       window.alert(message);
       return;
     }
     if(response.ok) {
       const records = await response.json();
       setRecords(records);
     }
   }
   getRecords();
   return;
 }, [records.length]);


 function onLogout(e) {
  e.preventDefault();
  navigate("/");
  window.localStorage.clear()
}

 const [record, setRecord] = useState({email: "", username: ""});
 useEffect(() =>{
   function getUser() {
     fetch("https://nelly-ecommerce-app.onrender.com/success", {
     method: "POST",
     crossDomain: true,
     headers: {
       "Content-Type": "application/json",
       Accept: "application/json",
       "Access-Control-Allow-Origin": "*"
     },
     body: JSON.stringify({
         token: window.localStorage.getItem("token"),
     }),
   })
   .then((response) => response.json())
   .then((data) => { 
       const objects = {
          email: data.data.email,
          username: data.data.username,
       }
         setRecord(objects);
         if(data.data === "token expired"){
          // navigate("/signin");
           window.localStorage.clear()
         }
   })
     }
     getUser();
     return;
 }, [record.length]);

 const [number, setNumber] = useState(null);
 useEffect(() => {
  async function getNumber() {
    const response = await fetch(`https://nelly-ecommerce-app.onrender.com/cartCounter`); 
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    if(response.ok) {
      const getNumber = await response.json();
      setNumber(getNumber);
    }
  }
  getNumber();
  return;
});

const [addActiveState, setActiveState] = useState(true);
const handleChange = () => {
  return setActiveState(!addActiveState);
};

  return (
    <>   
     <CartBar  /> 
      <Container fluid className="main_nav">
      <Row>
        <Col sm={12} xl={4} lg={4} md={12} xs={12}>
        <div className="box">
        <Button className="toggleBtn" onClick={() => handleChange()}><FeatherIcon icon="menu" /></Button>
        <ul className={addActiveState ? "nav_items" : "nav_items active"}>
          {records.map(NavCategories)}
        </ul>
        </div>
        </Col>
          <Col sm={12} xl={4} lg={4} md={12} xs={12}>
          <div className="box text-center">
                    <Link to="/">
                        <h1 className="logo">nelly's</h1>
                        <span className="logo_plus">Beautyplace</span>
                    </Link>
          </div>
        </Col>
                        <Col sm={12} xl={4} lg={4} md={12} xs={12}>
                        <div className="box text-end">
                          <ul>
                          <li>
                          <div className="chat_box">
                          <div className="input-group">
                          <div className="input-group-append">
                          <span className="input-group-text" id="basic-addon2"> <FeatherIcon icon="search" /></span>
                          </div>
                          <input type="text" className="form-control input" placeholder="Search for items" aria-describedby="basic-addon2" />
                          </div>
                          </div>                             
                          </li>
                          <li>
                          <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                          <FeatherIcon icon="user" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          <Dropdown.Item >
                          <Link to={ isLoggedIn === "true" ? "/" : "/signin" } >
                          { isLoggedIn === "true" ? "Hi " + record.username : "Sign-in" }
                          </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item ><Link to="/account">Account</Link></Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item ><Link to="/order-history">Order</Link></Dropdown.Item>
                            {
                              isLoggedIn === "true" ? 
                              <>
                              <Dropdown.Divider /> <Dropdown.Item> <Button onClick={onLogout}>Logout</Button>  </Dropdown.Item>
                              </>:
                              null
                            }  
                          </Dropdown.Menu>
                          </Dropdown>
                        </li>
                        <li><Link to="/wishlist"> <FeatherIcon icon="heart" /></Link></li>
                        <li className="cart_action">
                            <div className="cart_counter">
                                <div className="cart_num">{number}</div>
                            </div>
                            <Link onClick={cartToggle} className="cart_dropToggle">
                            <FeatherIcon icon="shopping-bag" />
                            </Link>
                        </li>
                    </ul>
            
                </div>
                <div className="mobileCart">
                <Button className="cartToggleBtn">
                  <div className="cart_counter">
                  <div className="cart_num">{number}</div>
                  </div>
                  <Link onClick={cartToggle} className="cart_dropToggle">
                  <FeatherIcon icon="shopping-bag" />
                  </Link>
                  </Button>
                </div>
                <div className="mobileDropdown">
                <Dropdown>
                          <Dropdown.Toggle id="dropdown-basic">
                          <FeatherIcon icon="user" />
                          </Dropdown.Toggle>
                          <Dropdown.Menu>
                          <Dropdown.Item >
                          <Link to={ isLoggedIn === "true" ? "/" : "/signin" } >
                          { isLoggedIn === "true" ? "Hi " + record.username : "Sign-in" }
                          </Link>
                          </Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item ><Link to="/wishlist">Wishlist</Link></Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item ><Link to="/account">Account</Link></Dropdown.Item>
                          <Dropdown.Divider />
                          <Dropdown.Item ><Link to="/order-history">Order</Link></Dropdown.Item>
                            {
                              isLoggedIn === "true" ? 
                              <>
                              <Dropdown.Divider /> <Dropdown.Item> <Button onClick={onLogout}>Logout</Button>  </Dropdown.Item>
                              </>:
                              null
                            }  
                          </Dropdown.Menu>
                          </Dropdown>
                </div>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default MainNav;
