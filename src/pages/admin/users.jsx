import axios from "axios";
import { useEffect, useState } from "react";

export default function Users() {
    const [users,setUsers] = useState("loading")
     const [usersloaded, setUserLoaded] = useState(false);

    useEffect(() => {
    
        if(!usersloaded){
        const token = localStorage.getItem("token");
        axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/users/user`, {
            headers: { Authorization: `Bearer ${token}` },
          })
          .then((res) => {
            console.log(res.data);
            setUsers(res.data);
            setUserLoaded(true);
          })
          .catch((err) => {
            console.error(err);
          });
        }
      }, [usersloaded]);


      //delete handle
      const handleDelete = (email) => {
        if(window.confirm("Are you sure You want to delete this user ?")){
        setUsers(users.filter((users) => users.email !== email));
        const token = localStorage.getItem("token");
    
        axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/users/${email}`,{
          headers : {Authorization: `Bearer ${token}`},
        
        }).then((res)=>{
          console.log(res.data);
          setUserLoaded(false);
       
        }).catch((err)=>{
          console.log(err);
        })
      }
      };




    return (
        <div className="w-full h-full p-6 flex items-center flex-col">
      {!usersloaded && <div className="border-4 my-4 border-b-green-500 rounded-full animate-spin w-[100px] h-[100px]"></div>}
     {usersloaded && <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 shadow-lg rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-gray-700">
              <th className="p-3 border">email</th>
              <th className="p-3 border">role</th>
              <th className="p-3 border">first Name</th>
              <th className="p-3 border">Last name</th>
              <th className="p-3 border">address</th>
              <th className="p-3 border">phone Number</th>
              <th className="p-3 border">Actions</th>
              
            </tr>
          </thead>
          <tbody>
            {users.map((users) => (
              <tr key={users.phone} className="hover:bg-gray-50">
                <td className="p-3 border text-center">{users.email}</td>
                <td className="p-3 border text-center">{users.role}</td>
                <td className="p-3 border text-center">{users.firstName}</td>
                <td className="p-3 border text-center">{users.lastName}</td>
                <td className="p-3 border text-center">{users.address}</td>
                <td className="p-3 border text-center">{users.phone}</td>
                <td className="p-3 border text-center">
                  
                </td>
                <td className="p-3 border text-center space-x-2">
                  <button onClick={()=>{
                    navigate(`/admin/users/edit`, {state:users})
                  }} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-700">
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(users.email)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>}
     {/* <Link to="/admin/items/add" className="fixed right-4 bottom-4">
        <CiCirclePlus className="text-blue-500 text-6xl hover:text-blue-700 transition-all" />
      </Link>*/}
    </div>
  );
}