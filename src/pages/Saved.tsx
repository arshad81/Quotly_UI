import { useContext } from "react";
import { AuthContext } from "../AuthProvider";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { BASE_API_URL } from "../config/api";
import axios from "axios";

interface Quote {
    _id: string;
    text: string;
    author?: string;
}

export default function Saved() {
    const savedQuotes: Quote[] = (useContext(AuthContext).savedQuotes || []);
    console.log("Saved Quotes:", savedQuotes);

    const { unsaveQuote } = useContext(AuthContext);

    return (
        <div className="h-screen ">
            <div className="flex justify-start items-start gap-x-6 h-full p-4">
                <Sidebar />
                <div className="w-full">
                    <Header />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {savedQuotes.map((quote) => (
                            <div
                                key={quote._id}
                                className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
                            >
                                <p className="text-gray-800 text-lg font-medium leading-relaxed">
                                    "{quote.text}"
                                </p>
                                <div className="flex justify-between items-center">
                                    <button className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition" onClick={() => { unsaveQuote(quote._id) }}>Unsave</button>
                                    {quote.author && (
                                        <p className="text-gray-500 mt-4 text-right italic">
                                            - {quote.author}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}

                    </div>
                </div>
            </div>
        </div>

    )
}