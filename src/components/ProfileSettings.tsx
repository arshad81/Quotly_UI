import axios from "axios";
import { useState } from "react";
import { BASE_API_URL } from "../config/api";

const ProfileSettings = () => {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleUsernameChange = async () => {
        try {
            await axios.put(
                `${BASE_API_URL}/auth/updateUsername`,
                { newUsername: username },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            await axios.put(`${BASE_API_URL}/quotes/authorName`, { username: username }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            localStorage.removeItem("token");
            window.location.href = "/login";
            alert("Username updated successfully");
        } catch (error) {
            alert("Error updating username");
        }
    }

    const handlePasswordChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        try {
            await axios.post(
                `${BASE_API_URL}/user/update-password`,
                { password },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            alert("Password updated successfully");
        } catch (error) {
            alert("Error updating password");
        }
    }

    const handleDeleteAccount = async () => {
        console.log("Deleting account...");
        try {
            await axios.delete(
                `${BASE_API_URL}/auth/deleteUser`,
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            localStorage.removeItem("token");
            window.location.href = "/signup";
        }

        catch (error) {
            alert("Error deleting account");
        }
    }

    return (
        <div className="h-fit w-1/4 bg-[#788585] text-black p-4">
            <p>Change Username</p>
            {/* Add quote form */}
            <div>
                <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder=""
                    className="flex-1 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    onClick={handleUsernameChange}
                    className="px-6 py-2 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </div>
            <p>Change Password</p>
            <form
                onSubmit={() => { }}
                className="max-w-xl mx-auto  gap-3 my-3"
            >
                <input
                    type="text"
                    value={""}
                    onChange={(e) => { setPassword(e.target.value); handlePasswordChange(e); }}
                    placeholder=""
                    className="flex-1 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <button
                    type="submit"
                    className="px-6 py-2 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                >
                    Submit
                </button>
            </form>
            <button
                onClick={() => { handleDeleteAccount() }}
                className="px-6 py-2 mt-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
                Delete Account
            </button>
        </div>
    );
};

export default ProfileSettings