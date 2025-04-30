import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./Edituser.css";  

export default function Edituser() {
  const { name } = useParams();  
  const [user, setUser] = useState({ event: "", num_participant: "" });
  const [loading, setLoading] = useState(true);  

  const amount = 5000;
  const newvalue = amount * user.num_participant;

   
  useEffect(() => {
    const fetchUser = async () => {
      try {
        console.log("Fetching details for:", name);
        const response = await axios.get(`http://localhost:3002/supplier/get/${name}`);
        setUser(response.data);  
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user details:", error);
        setLoading(false);
      }
    };

    fetchUser();
  }, [name]);

   
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Sending request to:", `http://localhost:3002/supplier/update/${name}`);
    console.log("Data being sent:", user);

    try {
      const response = await axios.put(`http://localhost:3002/supplier/update/${name}`, user, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("User updated successfully:", response.data);
      alert(`User details updated. New cost value: ${newvalue}`);
    } catch (error) {
      console.error("Error updating user:", error.response ? error.response.data : error.message);
      alert("Error updating user!");
    }
  };

   
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <div className="edituser-container">
      <h2 className="edituser-title">Update Your Details</h2>
      
      {loading ? ( 
        <p>Loading...</p> 
      ) : ( 
        <form onSubmit={handleSubmit} className="edituser-form">
          <div className="edituser-form-group">
            <label className="edituser-label">Event</label>
            <input 
              type="text" 
              name="event" 
              value={user.event} 
              onChange={handleChange} 
              required 
              className="edituser-input" 
            />
          </div>
          <div className="edituser-form-group">
            <label className="edituser-label">Participant</label>
            <input 
              type="number" 
              name="num_participant" 
              value={user.num_participant} 
              onChange={handleChange} 
              required 
              className="edituser-input" 
            />
          </div>
          <button type="submit" className="edituser-submit">Update</button>
        </form>
      )}
    </div>
  );
}
