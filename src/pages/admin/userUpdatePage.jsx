import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserUpdatePage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Initialize state with values from location state
  const [userEmail, setUserEmail] = useState(location.state.email);
  const [userRole, setUserRole] = useState(location.state.role); // Changed from name to role
  const [userFirstName, setUserFirstName] = useState(location.state.firstName);
  const [userLastName, setUserLastName] = useState(location.state.lastName);
  const [userAddress, setUserAddress] = useState(location.state.address);
  const [userPhone, setUserPhone] = useState(location.state.phone);

  async function handleUpdateUser () {
    console.log({
      email: userEmail,
      role: userRole,
      firstName: userFirstName,
      lastName: userLastName,
      address: userAddress,
      phone: userPhone,
    });

    const token = localStorage.getItem("token");

    if (token) {
      try {
        const result = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${userEmail}`,
          {
            email: userEmail,
            role: userRole,
            firstName: userFirstName,
            lastName: userLastName,
            address: userAddress,
            phone: userPhone,
          },
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
        );
        toast.success(result.data.message);
        navigate("/admin/users/");
      } catch (err) {
        console.error(err); // Log the error for debugging
        if (err.response) {
          // The request was made and the server responded with a status code
          toast.error(err.response.data.message || "User  not updated");
        } else if (err.request) {
          // The request was made but no response was received
          toast.error("No response from server");
        } else {
          // Something happened in setting up the request that triggered an Error
          toast.error("Error: " + err.message);
        }
      }
    } else {
      toast.error("You are not authorized to do this action");
    }
  }

  return (
    <div className="w-full h-full flex flex-col items-center p-4">
      <h1 className="text-xl font-bold mb-4">Update User</h1>
      <div className="w-[400px] border p-4 flex flex-col gap-3 rounded-lg shadow-md">
        <input
          disabled
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          type="text"
          placeholder="User  Email"
          className="border p-2 w-full rounded placeholder-gray-500"
        />
        <input
          onChange={(e) => setUserRole(e.target.value)}
          value={userRole}
          type="text"
          placeholder="User  Role"
          className="border p-2 w-full rounded placeholder-gray-500"
        />
        <input
          onChange={(e) => setUserFirstName(e.target.value)}
          value={userFirstName}
          type="text"
          placeholder="User  First Name"
          className="border p-2 w-full rounded placeholder-gray-500"
        />
        <input
          onChange={(e) => setUserLastName(e.target.value)}
          value={userLastName}
          type="text"
          placeholder="User  Last Name"
          className="border p-2 w-full rounded placeholder-gray-500"
        />
        <input
          onChange={(e) => setUserAddress(e.target.value)}
          value={userAddress}
          type="text"
          placeholder="User  Address"
          className="border p-2 w-full rounded placeholder-gray-500"
        />
        <input
          onChange={(e) => setUserPhone(e.target.value)}
          value={userPhone}
          type="text"
          placeholder="User  Phone"
          className="border p-2 w-full rounded placeholder-gray-500"
        />
        <button
          onClick={handleUpdateUser }
          className="bg-blue-500 text-white p-2 w-full rounded hover:bg-blue-600"
        >
          Update
        </button>
        <button
          onClick={() => {
            navigate("/admin/users");
          }}
          className="bg-red-600 text-white p-2 w-full rounded hover:bg-red-700"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}