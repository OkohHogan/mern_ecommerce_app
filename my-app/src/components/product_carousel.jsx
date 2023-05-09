import React, { useState, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useParams, useNavigate } from "react-router";


function ControlledCarousel(props) {
  const [index, setIndex] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const params = useParams();
  const navigate = useNavigate();
  const [fetchRecord, setFetchRecord] = useState({image:"", title:""})
  
  useEffect(() => {
    async function fetchData() {
      const id = params.id.toString();
      const response = await fetch(`http://localhost:5050/item/${params.id.toString()}`);
      const record = await response.json();
      if (!response.ok) {
        const message = `An error has occurred: ${response.statusText}`;
        window.alert(message);
        return;
      } 
      if(response.ok) {
        const imageRecord = record.upFile;
        const titleRecord = record.title;
        const getRecord = {
          image: imageRecord,
          title: titleRecord
        }
        setFetchRecord(getRecord)
      }  
      
      if (!record) {
        window.alert(`Record with id ${id} not found`);
        navigate("/");
        return;
      }    
    }
    fetchData();
    return;
  }, [params.id, navigate]);
  return (
    <Carousel activeIndex={index} onSelect={handleSelect} variant='dark'>
     <Carousel.Item>
     <img
        className="d-block w-100"
        src={fetchRecord.image}
        alt={fetchRecord.title}
      />
     </Carousel.Item>
    </Carousel>
  );
}


export default ControlledCarousel;