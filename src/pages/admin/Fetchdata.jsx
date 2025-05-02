import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./Fetchdata.css";

export default function Fetchdata() {
  const [data, setData] = useState([]);
  const [notification, setNotification] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:3002/supplier/get");
      console.log("Fetched Data:", response.data);
      setData(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const confirmDelete = (name) => {
    setSelectedUser(name);  
  };

  const handleDelete = async () => {
    if (!selectedUser) return;

    try {
      await axios.delete(`http://localhost:3002/supplier/items/${selectedUser}`);
      setNotification(`User ${selectedUser} deleted successfully!`);
      fetchData();
    } catch (error) {
      console.error("Error deleting item:", error);
      setNotification("Failed to delete user.");
    }

    setSelectedUser(null);  
  };

  return (
    <div className="table-container">
      <h2 className="table-title">User List</h2>

      {notification && <div className="notification">{notification}</div>}

      <table className="styled-table">
        <thead>
          <tr>
          <th>UserID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Event</th>
            <th>Participant</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((user) => (
              <React.Fragment key={user.id}>
                <tr>
                <td>{user.userid}</td>
                  <td>{user.name}</td>
                  <td>{user.address}</td>
                  <td>{user.event}</td>
                  <td>{user.num_participant}</td>
                  <td>
                    <Link to={`/edituser/${user.name}`} className="edit-button">
                      Edit
                    </Link>
                  </td>
                  <td>
                    <button onClick={() => confirmDelete(user.name)} className="delete-button">
                      Delete
                    </button>
                  </td>
                </tr>
                {selectedUser === user.name && (
                  <tr className="confirm-row">
                    <td colSpan="6" className="confirm-box">
                      <p>Are you sure you want to delete {user.name}?</p>
                      <button onClick={handleDelete} className="confirm-button">Yes, Delete</button>
                      <button onClick={() => setSelectedUser(null)} className="cancel-button">Cancel</button>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="no-data">No users found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
