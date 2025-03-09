import { useState } from "react";

import { useState, useEffect } from "react";
import axios from "axios"; // Import Axios

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get('https://backend-1-yaoz.onrender.com/profile')
      .then(response => {
        setUser(response.data); // Set user data from backend
      })
      .catch(error => {
        console.error("Error fetching profile:", error);
      });
  }, []);


  if (!user) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-4">
      <h2 className="text-center">My Profile</h2>
      <div className="card mx-auto" style={{ maxWidth: "400px" }}>
        <img
          src={user.avatar}
          alt="Profile Avatar"
          className="card-img-top rounded-circle mx-auto mt-3"
          style={{ width: "120px", height: "120px", objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h4 className="card-title">{user.name}</h4>
          <p className="card-text">{user.email}</p>
          <p className="card-text">{user.bio}</p>
        </div>
      </div>
    </div>
  );

};

export default Profile;
