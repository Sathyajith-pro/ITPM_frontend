import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./Adddetails.css";  

function Adddetails() {
  const location = useLocation();
  const priceFromProduct = location.state?.price || 0;
  const eventName = location.state?.event || "";

  const [formData, setFormData] = useState({
    userid:"",
    name: "",
    address: "",
    event: eventName,
    num_participant: "",
  });
  const [error, setError] = useState("");

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

    const num = parseInt(formData.num_participant);
    if (!num || num <= 0) {
      setError("Participants must be at least 1.");
      return;
    }

    const totalCost = num * priceFromProduct;

    fetch("http://localhost:3002/supplier/addsuppliers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    }).then(() => {
      alert(`Name: ${formData.name}\nAddress: ${formData.address}\nEvent: ${formData.event}\nTotal Cost: LKR ${totalCost}`);
    });
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Enter Your Details</h2>
      <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
          <label>UserID Number</label>
          <input type="text" name="userid" value={formData.userid} onChange={handleChange} required />
        </div>
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
          <input type="text" name="event" value={formData.event} onChange={handleChange} required readOnly />
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
