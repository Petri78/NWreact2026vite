import React, { useState } from "react";
import UserService from "./services/Auth.js";

function ChangePwd({ setLoggedIn, setIsPositive, setShowMessage ,setMessage }) {
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    newPassword2: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    UserService.setToken(token);
        if (!token ) {
        setMessage("Please log in to edit users.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
        return;
        }


    const dataToSend = {
    oldPassword: passwords.oldPassword,
    newPassword: passwords.newPassword
  };

    if (passwords.newPassword !== passwords.newPassword2){
      setMessage("Salasanat eivät täsmää!");
      setIsPositive(false);
      setShowMessage(true);

      setTimeout(()=> setShowMessage(false), 5000);
      return;
    }

    try {
      await UserService.changePassword(dataToSend);
      setMessage("Salasana vaihdettu!")
      setIsPositive(true)
      setShowMessage(true)
      setPasswords({oldPassword:"", newPassword:"", newPassword2:""})
      setTimeout(() => {
            setShowMessage(false);
            localStorage.clear();
            setTimeout(()=> setLoggedIn(false),500); }, 3000);
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
  };

  return (
    <div className="passwordBox">
      <h2>Vaihda salasana</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Vanha salasana"
          value={passwords.oldPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, oldPassword: e.target.value })
          }
          required
        />

        <input
          type="password"
          placeholder="Uusi salasana"
          value={passwords.newPassword}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword: e.target.value })
          }
          required
        />

          <input
          type="password"
          placeholder="Uusi salasana uudestaan"
          value={passwords.newPassword2}
          onChange={(e) =>
            setPasswords({ ...passwords, newPassword2: e.target.value })
          }
          required
        />

        <button type="submit">Tallenna</button>
      </form>
    </div>
  );
}

export default ChangePwd;
