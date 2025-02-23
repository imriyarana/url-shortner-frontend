import  { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import loginImg from "../Images/butterfly.jpg";
import { Link } from "react-router-dom";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
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
            const response = await axios.post("http://localhost:8080/user/login", {
                email,
                password
            }, { withCredentials: true });
            
            if (response.data.message === "Login successful") {
                setSuccess("Login successful!");
                navigate("/");
            }
        } catch (err) {
            setError(err.response?.data?.message || "Login failed. Try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <div className="flex justify-center mb-4">
                    <img src={loginImg}
                        alt="Url-shortner"
                        className="h-12 w-auto object-contain" />
                </div>
                <h2 className="text-2x1 font-semibold text-center mb-6">Login meow :3</h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                <form onSubmit={submitHandler}>
                    <div className="mb-4">
                        <label htmlFor="email"
                            className="block text-sm font-medium text-gray-700">Email 𐙚</label>
                        <input type="email" 
                        id="email" 
                        value={email}
                        onChange={(e)=> setEmail(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password"
                            className="block text-sm font-medium text-gray-700">Pawswordᯓᡣ𐭩</label>
                        <input type="password"
                        id="email" 
                        value={password}
                        onChange={(e)=> setPassword(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm" />
                    </div>
                    <button type="submit" className="w-full py-2 px-4 bg-slate-500 hover:bg-slate-700 text-whit font-semibold rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2
    focus:ring-slate-500" disabled={loading}>{loading ? "Login you in ..." : "Loginᥫ᭡"}</button>
                </form>
                <div className="mt-6 text-center">
                    <div className="relative mb-4">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-gray-300"></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 to-gray-50">OR</span>
                        </div>
                    </div>
                    <div className="mt-4 text-center text-sm"></div>
                    <span>
                        dont have an account? <Link to="/Signup" className="font-medium text-urlShortner">Signup here</Link>
                    </span>
                </div>
            </div>
        </div>
    );
}

export default Login;
