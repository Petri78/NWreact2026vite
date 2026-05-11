import React, { useState } from "react";
import UserService from "./services/Auth.js";
import CustomerService from "./services/Customer.js"
import ProductService from "./services/Products.js"

function Login({ setLoggedIn, setIsPositive, setShowMessage, setMessage }) {
  const [credentials, setCredentials] = useState({
    userName: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await UserService.login(credentials);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("username", response.data.userName);
      localStorage.setItem("role", response.data.role);
      CustomerService.setToken(response.data.token);
      UserService.setToken(response.data.token);
      ProductService.setToken(response.data.token);

      setLoggedIn(true);
    } 
    catch (error)
    {
      const backendMessage = error.response?.data || error.response?.message || "Tuntematon virhe";
      const axiosMessage = error.message;
      setMessage(error.response 
          ? `backend Virhe: ${backendMessage}` 
          : `axios Virhe: ${axiosMessage}`
      );
      setIsPositive(false);
      setShowMessage(true);
      setTimeout(()=> {setShowMessage(false);},5000)
    }
    // catch {
    //   alert("Virheellinen käyttäjätunnus tai salasana");
    // }
  };

  return (
    <div className="loginBox">
      <h2>Kirjaudu sisään</h2>

      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Käyttäjätunnus"
          value={credentials.userName}
          onChange={(e) =>
            setCredentials({ ...credentials, userName: e.target.value })
          }
        />

        <input
          type={showPassword ? "text" : "password"}
          placeholder="Salasana"
          value={credentials.password}
          onChange={(e) =>
            setCredentials({ ...credentials, password: e.target.value })
          }
        />

        <button type="button" onClick={() => setShowPassword(!showPassword)}>
          {showPassword ? "Piilota" : "Näytä"}
        </button>

        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;
