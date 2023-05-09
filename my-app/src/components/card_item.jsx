import React from "react";
import FeatherIcon from "feather-icons-react/build/FeatherIcon";
import { Link } from "react-router-dom";
// import { Button } from "react-bootstrap";

// function postData(){

// }

function Card(props){
    return (    
     <Link  to={`/product/${props.id}`} id={props.id} className="active">
        <div className="box">
            <div className="img_box">
                <div className="img" style={{backgroundImage: `url(${props.image})`}}></div>
                <div className="fav_btn">
                    <FeatherIcon icon="heart" />
                </div>
            </div>
            {/* <div className="cart_btn_action">
                <Button onClick={postData}  id={props.id}  className="btn form-control">Add to Bag</Button>
            </div> */}
            <div className="text_box">
                <h3 className="title">{props.title}</h3>
                <p className="cost">${props.price}</p>
            </div>
        </div>
         </Link>           
    );
}

export default Card;