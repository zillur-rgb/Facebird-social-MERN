import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
const Login = () => {
  const [inputs, setInputs] = useState<{
    username: string;
    password: string;
  }>({
    username: "",
    password: "",
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const { login } = useContext(AuthContext);

  const handleClick = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    try {
      await login(inputs);
      navigate("/");
    } catch (err: any) {
      setError(err);
    }
  };

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Hello World</h1>
          <p>
            {" "}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero cum,
            alias totam numquam ipsa exercitationem dignissimos, error nam,
            consequatur.
          </p>
          <span>Don't you have an account?</span>
          <Link to={"/register"}>
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form>
            <input
              type="text"
              placeholder="Username"
              name="username"
              onChange={handleChange}
            />
            <input
              type="paswword"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />
            {error && error}
            <button onClick={handleClick}>Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default Login;
