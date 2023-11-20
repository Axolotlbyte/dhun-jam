import "./App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export default function Login() {
  const [body, setBody] = useState({
    username: "",
    password: "",
  });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://stg.dhunjam.in/account/admin/login",
        {
          ...body,
        }
      );
      
      console.log(res);

      return navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();

  return (
    <div className="max-h-screen flex items-center justify-center flex-col">
      <h1 className="pb-5 mb-8">Venue Admin Login</h1>
      <form className="grid">
        <input
          value={body.username}
          onChange={(e) => setBody({ ...body, username: e.target.value })}
          className="text-input"
          type="text"
          placeholder="Username"
        />
        <input
          value={body.password}
          onChange={(e) => setBody({ ...body, password: e.target.value })}
          className="text-input"
          type="password"
          placeholder="Password"
        />
        <button
          className="input-button"
          style={{ marginTop: "20px" }}
          type="submit"
          placeholder="Sign In"
          onClick={(e) => handleSubmit(e)}
        >
          Sign In
        </button>
        <small>New Registration?</small>
      </form>
    </div>
  );
}
