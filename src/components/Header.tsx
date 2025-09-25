import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Header() {
    const [username, setUsername] = useState<string | null>(null);
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decoded = jwtDecode<any>(token);
            console.log("Logged in as:", decoded.username);
            setUsername(decoded.username);
        }
    }, []);
    return (
        <div className="flex justify-between items-center mb-12">
            <h1 className="text-5xl text-center text-black italic fon">
                Quotly
            </h1>
            {username && <p className="text-gray-600">Welcome, {username}!</p>}
        </div>
    )
}