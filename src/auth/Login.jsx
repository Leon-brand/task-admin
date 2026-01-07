

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { firebaseError } from "./firebaseErrors";


export const Login =() => {
  const [email, setEmail] = useState("");
  const [ password, setPassword] = useState("");
  const [ error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("")
    
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      const errorMessage = firebaseError(err.code);
      setError(errorMessage);
    }
  };

  return (
    <div className="auth-container">
      <form onSubmit={handleSubmit}>
        <div style={{textAlign: 'center', color: '#646cff'}}>
                  <h1>Task Manager</h1>
        <h2>Login</h2>
        </div>
        {error && <p  className="error-message-auth">{error}</p>}
        <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} required />
        <button type="submit" className="login-btn">Entrar</button>
      </form>
      <p>¿No tienes cuenta? <Link to="/register">Regístrate</Link></p>
    </div>
  );
};