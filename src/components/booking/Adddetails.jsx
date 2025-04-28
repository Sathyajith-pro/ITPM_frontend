import React, { useState } from "react";
import "./Adddetails.css";  

function Adddetails() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    event: "",
    num_participant: "",
  });
  const [error, setError] = useState("");

  const COST_PER_PARTICIPANT = 5000;  

  const handleChange = (e) => {
    const { name, value } = e.target;

     
    if (name === "num_participant") {
      if (!/^\d*$/.test(value)) {
        setError("Please enter a valid number.");
        return;
      } else {
        setError("");  
      }
    }

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.num_participant || formData.num_participant <= 0) {
      setError("Participants must be at least 1.");
      return;
    }

    const totalCost = formData.num_participant * COST_PER_PARTICIPANT;  
    
    fetch("http://localhost:5001/supplier/addsuppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      alert(`Name: ${formData.name}\nAddress: ${formData.address}\nTotal Cost: ${totalCost} INR`);
    });

    
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Address</label>
          <textarea name="address" value={formData.address} onChange={handleChange} required></textarea>
        </div>
         
        <div className="form-group">
          <label>Event</label>
          <input type="text" name="event" value={formData.event} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Number of Participants</label>
          <input 
            type="number" 
            name="num_participant" 
            value={formData.num_participant} 
            onChange={handleChange} 
            min="1"
            required 
          />
          {error && <p className="error-message">{error}</p>}
        </div>
        <button type="submit" className="submit-button">Payment</button>
      </form>
    </div>
  );
}

export default Adddetails;
