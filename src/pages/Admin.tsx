import { useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import axios from "axios";
import { BASE_API_URL } from "../config/api";
import { AuthContext } from "../AuthProvider";

interface User {
  _id: string;
  username: string;
  role: string;
}

export default function AdminPageUI() {
  const [allUsers, setAllUsers] = useState([] as User[]);
  const username = useContext(AuthContext).username;
  const deleteUser = async (userId: string) => {
    try {
      console.log("Deleting user:", userId);
      await axios.delete(`${BASE_API_URL}/auth/deleteByAdmin/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setAllUsers([]);
      getAllUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  }

  const revokeAdmin = async (userId: string) => {
    try {
      console.log("Revoking admin for user:", userId);
      await axios.put(`${BASE_API_URL}/auth/revokeAdmin/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllUsers([]);
      getAllUsers();
    } catch (error) {
      console.error("Error revoking admin:", error);
    }
  }

  const makeAdmin = async (userId: string) => {
    try {
      console.log("Making admin for user:", userId);
      await axios.put(`${BASE_API_URL}/auth/makeAdmin/${userId}`, {}, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAllUsers([]);
      getAllUsers();
    } catch (error) {
      console.error("Error making admin:", error);
    }
  }

  const getAllUsers = async () => {
    try {
      const users = await axios.get(`${BASE_API_URL}/auth/allUsers`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      console.log(users.data);
      setAllUsers(users.data.users);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  }

  useEffect(() => {

    getAllUsers();
  }, []);

  return (
    <div className="h-screen flex justify-start items-start gap-x-6 p-4">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div>
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Username
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Role
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {allUsers.map((user) => {
                  if (user.username == username) {
                    return null;
                  }
                  return (
                    <tr key={user._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role == "admin" ? "Admin" : "User"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                        <button onClick={() => { deleteUser(user._id) }} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition">
                          Delete
                        </button>
                        {user.role == "user" ? (
                          <button onClick={() => { makeAdmin(user._id) }} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                            Make Admin
                          </button>)
                          :
                          (<button onClick={() => { revokeAdmin(user._id) }} className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600 transition">
                            Revoke Admin
                          </button>
                          )}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            {allUsers.length === 0 && (
              <p className="p-6 text-center text-gray-500">No users found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
