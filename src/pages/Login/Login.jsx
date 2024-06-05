import { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Login = () => {
  const [username, setUsername] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityicka");
  const [loading, setLoading] = useState(false);
  // const [token, setToken] = useState(null);
  const [error, setError] = useState(false);
  const navigate = useNavigate();
  const loginData = {
    email: username,
    password: password,
  };
  const sendData = () => {
    axios
      .post("https://reqres.in/api/login", loginData)
      .then((req) => {
        if (req.status < 204) {
          setError(false);
          localStorage.setItem("token", JSON.stringify(req.data.token));
          navigate("/");
        }
      })
      .catch((error) => {
        setError(error.response.data.error);
        setTimeout(() => {
          setError(false);
        }, 5000);
      })
      .finally(() => setLoading(false));

    // const { token } = await rq.data;
    // console.log(await rq);
    //   console.log(rq);
    // } else {
    //   console.log(rq);
    // }
  };
  return (
    <div className="login-container">
      <form
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <img
          src=".././assets/icons/logo-login.svg"
          alt="login logo"
          className="logo"
        />
        {error && (
          <div className="show-error">
            <p>{error}</p>
          </div>
        )}
        <label htmlFor="username">
          <img src=".././assets/icons/user.svg" alt="user" />
          <input
            type="text"
            id="username"
            placeholder="USERNAME"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <img src=".././assets/icons/lock.svg" alt="lock" />
          <input
            type="text"
            id="password"
            placeholder="PASSWORD"
            value={password}
            onInput={(e) => {
              e.designMode = "on";
            }}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {!loading ? (
          <button
            onClick={() => {
              setLoading(true);
              sendData();
            }}
          >
            Login
          </button>
        ) : (
          <button>Logging . . . </button>
        )}
        <a href="#!">Forgot password?</a>
      </form>
    </div>
  );
};
