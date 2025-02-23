import { useState} from 'react';
import axios from "axios";

const Home = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const axiosInstance = axios.create({
    baseURL: "http://localhost:8080",
    withCredentials: true,
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const response = await axiosInstance.post('/url', { 
        url: longUrl,
      });
  
      if (response.data.id) {
        setShortUrl(`${window.location.origin}/url/${response.data.id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      
      setError(error.response?.data?.error || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-2">URL Shortener ✦⫘⫘⫘ˎˊ˗</h1>
        <p className="text-gray-600 text-center mb-6">Make your long URLs short and shareable</p>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Long URL</label>
            <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
              <input
                type="url"
                placeholder="Paste your long URL here"
                value={longUrl}
                onChange={(e) => setLongUrl(e.target.value)}
           className="w-full p-2 outline-none"
           required
             />
           </div>
         </div>
         <button type="submit" className="w-full bg-slate-500 hover:bg-slate-700 text-white py-2 rounded-md" disabled={loading}>
           {loading ? "Shortening your url..." : "shorten URL"}
         </button>
         {shortUrl && (
           <div className="mt-6">
             <label className="block text-sm font-medium text-gray-700 mb-2">Shortened URL</label>
             <div className="flex items-center space-x-2 border border-gray-300 rounded-md p-2">
               <input
                  type="text"
                 value={shortUrl}
                 readOnly
                  className="w-full p-2 bg-gray-100 outline-none"
               />
               <button
                  onClick={() => navigator.clipboard.writeText(shortUrl)}
                  className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                 Copy
               </button>
             </div>
            </div>
          )}
         </form>
       </div>
     </div>
  );
};

export default Home;