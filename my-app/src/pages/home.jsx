import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../components/card_item";
// import axios from "axios";

const  createCard =  (data) => {
  return (
   <Col key={data._id} xs={12} sm={4} xl={4} lg={4} md={4}>
     <Card 
      id={data._id}
      title={data.title}
      image={data.upFile}
      price={data.price} 
    />
   </Col>
  )
}

const Home = () => {
  const [records, setRecords] = useState([]);
 useEffect(() => {
  async function getRecords() {
    // axios
    // .get("http://localhost:5050/items")
    // .then(data => {
    //   const records =  data.json();
    //   setRecords(records);
    // })
    // .catch(error => console.log(error));
    // }
    const response = await fetch("http://localhost:5050/items");
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


    return (
      <Container className="items_box">
      <Row>
      {records.map(createCard)}
      </Row>
     </Container>
    )
  };
  
export default Home;
  