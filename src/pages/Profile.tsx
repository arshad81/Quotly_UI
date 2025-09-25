import { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import ProfileSettings from "../components/ProfileSettings";
import { BASE_API_URL } from "../config/api";

interface Quote {
  _id: string;
  text: string;
  author?: string;
}

function Profile() {
  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [newQuote, setNewQuote] = useState("");

  // Fetch user's quotes
  const fetchUserQuotes = async () => {
    try {
      const res = await axios.get(`${BASE_API_URL}/quotes/user`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuotes(res.data.quotes);
    } catch (error) {
      console.error("Error fetching user quotes:", error);
    }

  };

  useEffect(() => {
    fetchUserQuotes();
  }, []);

  // Handle new quote submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post(
      `${BASE_API_URL}/quotes`,
      { text: newQuote },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    setQuotes([...quotes, res.data.quote]);
    setNewQuote("");
  };

  return (
    <div className="h-screen flex justify-start items-start gap-x-6 p-4">
      <Sidebar />
      <div className="w-full">
        <Header />
        <div className="flex justify-between items-start">
          <div className="w-3/4">
            <form
              onSubmit={handleSubmit}
              className="max-w-xl mx-auto flex gap-3 mb-12"
            >
              <input
                type="text"
                value={newQuote}
                onChange={(e) => setNewQuote(e.target.value)}
                placeholder="Write your quote..."
                className="flex-1 px-4 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Add
              </button>
            </form>

            <div className="max-w-3xl mx-auto grid gap-6">
              {quotes.length === 0 ? (
                <p className="text-center text-gray-500">
                  You haven't added any quotes yet.
                </p>
              ) : (
                quotes.map((quote) => (
                  <div
                    key={quote._id}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition"
                  >
                    <p className="text-lg text-gray-800 leading-relaxed">
                      “{quote.text}”
                    </p>
                    {quote.author && (
                      <p className="text-right text-sm text-gray-500 mt-2">
                        - {quote.author}
                      </p>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
          <ProfileSettings />
        </div>
      </div>

    </div>
  );
}

export default Profile;
