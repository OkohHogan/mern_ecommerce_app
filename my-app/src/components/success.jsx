import React, {  useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  function onLogout(e) {
    e.preventDefault();
    navigate("/signin");
    window.localStorage.clear()
  }
  const [record, setRecord] = useState({email: "", username: ""});
  useEffect(() =>{
    function getUser() {
      fetch("http://localhost:5050/success", {
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
        // console.log(objects);
          setRecord(objects);
          if(data.data === "token expired"){
           // alert("token expired")
            navigate("/signin");
            window.localStorage.clear()
          }
    })
      }
      getUser();
      return;
  }, [record.length]);

    return (
      <>
      <h1>{record.email}</h1>
      <h1>{record.username}</h1>
      <button onClick={onLogout} className="btn btn-primary">
        Logout
      </button>
      </>
    )
}

export default Success