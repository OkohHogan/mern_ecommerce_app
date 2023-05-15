import React, {useState, useEffect} from "react";
import { Container, Row, Col } from "react-bootstrap";
import Card from "../components/card_item";
import LoadingSpinner from "../components/loader";

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
  const [isLoading, setIsLoading] = useState(false);
 useEffect(() => {
  async function getRecords() {
    setIsLoading(true);
    const response = await fetch("https://nelly-ecommerce-app.onrender.com/items");
    if (!response.ok) {
      const message = `An error occurred: ${response.statusText}`;
      window.alert(message);
      return;
    }
    if(response.ok) {
      const records = await response.json();
      setRecords(records);
      setIsLoading(false) 
    }
  }
  getRecords();
  return;
}, [records.length]);

    return (
      <Container className="items_box">
      <Row>
      {isLoading ? <LoadingSpinner /> : records.map(createCard)}
      </Row>
     </Container>
    )
  };
  
export default Home;
  