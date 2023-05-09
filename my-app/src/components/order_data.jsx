import React, {useEffect, useState} from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FetchOrderData = (props) => {
    return (
        <>
              <div className="cart_data_box">
                    <Row >
                        <Col xs={12} lg={2} sm={2} md={2} xl={2} xxl={2}>
                            <div className="img_box">
                                <div className="img"  style={{backgroundImage: `url(${props.upFile})`}}></div>
                            </div>
                        </Col>
                        <Col xs={12} lg={10} sm={10} md={10} xl={10} xxl={10}>
                            <div className="text_box">
                                <div className="">
                                    <div className="cost float-end">
                                        <p className="price"><b>Order ID:</b> 583938483939</p>
                                        <p className="price"><b>Order Date:</b> 23 March, 2022</p>                 
                                        <p className="price"><b>Payment Method:</b> Credit/Debit Card</p>
                                        {/* <Link  className="btn cart_action">Add to bag</Link> */}

                                    </div>
                                    <div className="heading">
                                    <Link to={`/product/${props.id}`}>
                                    <h2>{props.title}</h2>
                                    </Link>        
                                    </div>
                                </div>
                                <div className="details">
                                    <p><b>Color:</b> Brown - <b>Price:</b> ${props.price} X {props.qty}</p>
                                    <p><b>Name:</b> {props.firstname} {props.lastname}</p>
                                    <p><b>Address</b> {props.address}</p>
                                    <p><b>Phone: </b> <Link to={`tel:${props.phone}`}>{props.phone}</Link></p>
                                </div>

                            </div>
                        </Col>
                    </Row>
                </div>
        </>
    )
}

const OrderData = () => {

        const [records, setRecords] = useState([]);
       useEffect(() => {
        async function getRecords() {
          const response = await fetch(`http://localhost:5050/orders`);
      
          if (!response.ok) {
            const message = `An error occurred: ${response.statusText}`;
            window.alert(message);
            return;
          }
          if(response.ok) {
            const records = await response.json();
            setRecords(records);
            // window.alert("Success")
          }
        }
        getRecords();
        return;
      }, [records.length]);


      function recordList() {
        return records.map((data) => {
          return (
            <FetchOrderData
                key={data._id}
                id={data._id}
                title={data.title}
                upFile={data.upFile}
                price={data.price} 
                phone={data.phone}
                address={data.address}
                firstname={data.firstname}
                lastname={data.lastname}
            />
          );
        });
      }

    return (
        <>
            <div className="box heading">
                <h1 className="mr-0">My Orders</h1>
            </div>

            <div className="order_box items_box">
              {recordList()}
            </div>
        </>
    )
}

export default OrderData;