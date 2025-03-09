import { useState } from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();

    
    if (email && password) {
      axios.post("https://backend-1-yaoz.onrender.com/login", { email, password })
        .then(response => {
          console.log("Login successful:", response.data);
          navigate("/profile"); // ✅ Redirect to Profile Page
        })
        .catch(error => {
          console.error("Login failed:", error);
          alert("Login failed. Please check your credentials.");
        });

    } else {
      alert("Please enter valid credentials.");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      <form className="w-50 mx-auto card p-4 shadow-sm" onSubmit={handleLogin}>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input 
            type="email" 
            className="form-control" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
};

export default Login;