import { useEffect, useState } from "react";
import axios from "axios";
import "../App.css" // optional if you want custom styles
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { BASE_API_URL } from "../config/api";

interface Quote {
    _id: string;
    text: string;
    author?: string;
}


function Dashboard() {
    const [quotes, setQuotes] = useState<Quote[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchQuotes = async () => {
            try {
                const res = await axios.get(`${BASE_API_URL}/quotes`);
                console.log(res.data.quotes);
                setQuotes(res.data.quotes);
            } catch (error) {
                console.error("Error fetching quotes:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchQuotes();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-gray-500 text-lg">Loading quotes...</p>
            </div>
        );
    }

    return (
        <div className="h-screen ">
            <div className="flex justify-start items-start gap-x-6 h-full p-4">
                <Sidebar />
                <div className="w-full">
                    <Header />
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8">
                        {quotes.map((quote) => (
                            <div
                                key={quote._id}
                                className="flex flex-col justify-between p-6 bg-white rounded-2xl shadow-lg hover:shadow-xl transition duration-300"
                            >
                                <p className="text-gray-800 text-lg font-medium leading-relaxed">
                                    "{quote.text}"
                                </p>
                                {quote.author && (
                                    <p className="text-gray-500 mt-4 text-right italic">
                                        - {quote.author}
                                    </p>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
