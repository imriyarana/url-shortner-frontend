import { useState } from "react";
import { useNavigate } from "react-router-dom";

import axios from "axios";
import SignupImg from "../Images/steel-heart.jpg";

const Signup = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const submitHandler = async (e) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:8080/user/signup", {
                name,
                email,
                password
            }, { withCredentials: true });
           
            if (response.data.message === "Signup successful")
             {
                
                setSuccess("Signup successful");
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Signup failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 font-title">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={SignupImg} alt="Url-shortner" className="h-12 w-auto object-contain" />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6">Sign up meow:3</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Username 𐙚</label>
                        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email 𐙚</label>
                        <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">Pawswordᯓᡣ𐭩</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-slate-500 hover:bg-slate-700 text-white font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500" disabled={loading}>
                        {loading ? "Signing up..." : "Signupᥫ᭡"}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Signup;




