import { AuthContext } from "../AuthProvider";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
    const navigate = useNavigate();
    const { isAdmin } = useContext(AuthContext);
    const { logout } = useContext(AuthContext);

    return (
        <div className="h-full w-64 bg-[#788585] text-black flex flex-col justify-between">
            {/* Top Links */}
            <div className="flex flex-col mt-8 space-y-4 px-6">
                <button
                    onClick={() => navigate("/")}
                    className="text-left px-4 py-2 hover:bg-[#788585] rounded-lg transition"
                >
                    Home
                </button>
                <button
                    onClick={() => navigate("/saved")}
                    className="text-left px-4 py-2 hover:bg-[#788585] rounded-lg transition"
                >
                    Saved
                </button>
                {
                    localStorage.getItem("token") && (
                        <button
                            onClick={() => navigate("/profile")}
                            className="text-left px-4 py-2 hover:bg-[#788585] rounded-lg transition"
                        >
                            Profile
                        </button>)
                }
                {isAdmin && (
                    <button
                        onClick={() => navigate("/admin")}
                        className="text-left px-4 py-2 hover:bg-[#788585] rounded-lg transition"
                    >
                        Admin
                    </button>
                )}
            </div>

            {localStorage.getItem("token") ? (

                <div className="mb-8 px-6">
                    <button
                        onClick={logout}
                        className="w-full px-4 py-2 bg-[#363020] rounded-lg hover:bg-red-700 transition text-white"
                    >
                        Log Out
                    </button>
                </div>
            ) :
                <div className="mb-8 px-6">
                    <button
                        onClick={() => navigate("/login")}
                        className="w-full my-4 px-4 py-2 bg-[#363020] rounded-lg hover:bg-red-700 transition text-white"
                    >
                        Sign in
                    </button>
                    <button
                        onClick={() => navigate("/signup")}
                        className="w-full px-4 py-2 bg-[#363020] rounded-lg hover:bg-red-700 transition text-white"
                    >
                        Sign up
                    </button>
                </div>
            }
        </div>
    );
};

export default Sidebar;
