import React, { useState, useEffect, useContext } from "react";
import userContext from "../Context/userContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  let newToken = "";
  const [message, setMessage] = useState({name:"",joke:""});

  const { token } = useContext(userContext);
  
  const navigate = useNavigate();
  if (localStorage.getItem("token")) {
    newToken = localStorage.getItem("token");
  } else {
    newToken = token;
  }
  
  useEffect(()=>{
    if(!localStorage.getItem("token"))
    {
        navigate("/login");
    }
    getJoke();
  },[])

  //Function to getJoke
  async function getJoke() {
    try {
      const response = await axios.get(
        "https://instagram-express-app.vercel.app/api/auth/zuku",
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
      console.log(response);
      setMessage({...message,name:response.data.data.user.name,joke:response.data.data.message});
    } catch (error) {
      alert("You must be logged In");
      // alert(error.response.data.message);
    }
  }
  
  //Function to logout
  async function logOut() {
    try {
      const response = await axios.delete(
        "https://instagram-express-app.vercel.app/api/auth/logout",
        {
          headers: {
            Authorization: `Bearer ${newToken}`,
          },
        }
      );
      alert(response.data.message);
      localStorage.clear();
      setMessage({...message,name:"",joke:""});
      navigate("/login");
    } catch (error) {
      alert(error.response.data.message);
    }
  }
  return (
    <div className="Dashboard">
        <h1>Welcome {message.name} </h1>
      <p className="message">{message.joke}</p>
      <div className="Buttons">
        <button onClick={getJoke}>Show Joke</button>
        <button onClick={logOut}>LogOut</button>
      </div>
    </div>
  );
};

export default Dashboard;
