import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/UseAuth";
import "./Login.css";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(form) {
    form.preventDefault();
    setErrorMessage();
    try {
      const user = await loginUser(email, password);
      login(user);
      navigate("/products");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  return (
    <div className="login-page">
      <form
        onSubmit={handleSubmit}
        style={{
          backgroundColor: "rgb(80, 176, 170)",
          width: "200px",
          height: "200px",
          display: "flex",
          flexDirection: "column",
          margin: "0 150px",
          justifyContent: "center",
          alignItems: "center",
          padding: "10rem",
          borderRadius: "2rem",
          boxShadow: " 0px 2px  8px  rgb(145, 255, 255)",
        }}
      >
        <h1 className="loginTitle" style={{ fontWeight: "100" }}>
          Login
        </h1>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <div>
          <label htmlFor="signup-email" className="login-label">
            Email
          </label>
          <input
            id="signup-email"
            type="text"
            value={email}
            onChange={(element) => setEmail(element.target.value)}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div>
          <label htmlFor="signup-password" className="login-label">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            value={password}
            onChange={(element) => setPassword(element.target.value)}
            required
            placeholder="Enter Your Password"
          />
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}
export default LoginPage;
