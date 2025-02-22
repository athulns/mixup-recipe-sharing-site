import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Dummy authentication (Replace with actual backend auth)
    const storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    const user = storedUsers.find(
      (u) => u.email === formData.email && u.password === formData.password
    );

    if (user) {
      alert("Login successful!");
      navigate("/home"); // Redirect to homepage
    } else {
      alert("Invalid email or password.");
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg" style={{ width: "400px" }}>
        <h2 className="text-center mb-4">Login</h2>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password Input */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100">
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <a href="/register" className="text-primary">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
