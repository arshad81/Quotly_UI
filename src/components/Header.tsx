import { useContext } from "react";
import { AuthContext } from "../AuthProvider";

export default function Header() {
    const username = useContext(AuthContext).username
    console.log("Header username:", username);
    return (
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl text-center text-black italic fon">
                Quotly
            </h1>
            {username && <p className="text-gray-600">Welcome, {username}!</p>}
        </div>
    )
}