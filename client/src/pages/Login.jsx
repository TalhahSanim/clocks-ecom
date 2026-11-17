import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth";
import { useAuth } from "../context/useAuth";
import form from "../styles/Form.module.css";
import styles from "./Login.module.css";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(form) {
    form.preventDefault();
    setErrorMessage("");
    try {
      const user = await loginUser(email, password);
      login(user);
      navigate("/products");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }
  return (
    <div className={form.page}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h1 className={form.title}>Login</h1>
        {errorMessage && <p className={form.error}>{errorMessage}</p>}

        <div>
          <label htmlFor="login-email" className={form.label}>
            Email
          </label>
          <input
            id="login-email"
            className={form.input}
            type="text"
            value={email}
            onChange={(element) => setEmail(element.target.value)}
            placeholder="Enter Your Email"
            required
          />
        </div>
        <div>
          <label htmlFor="login-password" className={form.label}>
            Password
          </label>
          <input
            id="login-password"
            className={form.input}
            type="password"
            value={password}
            onChange={(element) => setPassword(element.target.value)}
            required
            placeholder="Enter Your Password"
          />
        </div>

        <button type="submit" className={form.button}>
          Login
        </button>
      </form>
    </div>
  );
}
export default LoginPage;
