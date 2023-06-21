import { Link } from "react-router-dom";
import "./register.scss";
import { useState } from "react";
import axios from "axios";
const Regsiter = () => {
  const [inputs, setInputs] = useState<{
    username: string;
    email: string;
    password: string;
    name: string;
  }>({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await axios.post("http://localhost:5000/api/v1/auth/register", inputs);
    try {
    } catch (err: any) {
      setError(err);
    }
  };
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Facebird Social.</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Do you have an account?</span>

          <Link to={"/login"}>
            <button>Login</button>
          </Link>
        </div>
        <div className="right">
          <h1>Register</h1>
          <form>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
            />
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="Name"
              name="name"
              onChange={handleChange}
            />

            {error && error}
            <button onClick={handleClick}>Register</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Regsiter;
