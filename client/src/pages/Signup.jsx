import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/useAuth";
import form from "../styles/Form.module.css";

import styles from "./Signup.module.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(form) {
    form.preventDefault();
    setErrorMessage("");
    try {
      const user = await registerUser(name, email, password);
      login(user);
      navigate("/products");
    } catch (error) {
      setErrorMessage(error.message);
    }
  }

  return (
    <>
      <div className={form.page}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h1 className={form.title}>Register</h1>
          {errorMessage && <p className={form.error}>{errorMessage}</p>}
          <div>
            <label htmlFor="signup-name" className={form.label}>
              Name
            </label>

            <input
              id="signup-name"
              className={styles.input}
              type="text"
              value={name}
              onChange={(element) => setName(element.target.value)}
              required
              placeholder="Enter Your Name"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className={form.label}>
              Email
            </label>
            <input
              id="signup-email"
              className={styles.input}
              type="text"
              value={email}
              onChange={(element) => setEmail(element.target.value)}
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className={form.label}>
              Password
            </label>
            <input
              id="signup-password"
              className={styles.input}
              type="password"
              value={password}
              onChange={(element) => setPassword(element.target.value)}
              required
              placeholder="Enter Your Password"
            />
          </div>

          <button type="submit" className={form.button}>
            Create Your Account
          </button>
        </form>
      </div>
    </>
  );
}
export default Signup;
