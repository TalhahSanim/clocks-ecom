import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth";
import { useAuth } from "../context/UseAuth";
import "./Signup.css";

function SignupPage() {
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
      <div className="signup-page">
        <form
          onSubmit={handleSubmit}
          style={{
            backgroundColor: "rgb(98, 208, 201)",
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
          <h1 className="signupTitle" style={{ fontWeight: "100" }}>
            Register
          </h1>
          {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
          <div>
            <label htmlFor="signup-name" className="signup-label">
              Name
            </label>

            <input
              id="signup-name"
              type="text"
              value={name}
              onChange={(element) => setName(element.target.value)}
              required
              placeholder="Enter Your Name"
            />
          </div>

          <div>
            <label htmlFor="signup-email" className="signup-label">
              Email
            </label>
            <input
              id="signup-email"
              type="text"
              value={email}
              onChange={(element) => setEmail(element.target.value)}
              required
              placeholder="Enter Your Email"
            />
          </div>
          <div>
            <label htmlFor="signup-password" className="signup-label">
              Password
            </label>
            <input
              id="signup-password"
              type="text"
              value={password}
              onChange={(element) => setPassword(element.target.value)}
              required
              placeholder="Enter Your Password"
            />
          </div>

          <button type="submit">Create Your Account</button>
        </form>
      </div>
    </>
  );
}
export default SignupPage;
