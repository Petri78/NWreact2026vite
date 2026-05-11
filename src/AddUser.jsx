import "./App.css";
import React, { useState } from "react";
import UserService from "./services/Auth.js";

function AddUser({ setAddNew, setIsPositive, setShowMessage, setMessage }) {

    const [newUserName, setNewUserName] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [newEmail, setNewEmail] = useState("");
    const [newFirstName, setNewFirstName] = useState("");
    const [newLastName, setNewLastName] = useState("");
    const [newRole, setNewRole] = useState("User");
    const [newPassword2, setPassword2] = useState("");

    const handleSubmit = (e) => {
        const token = localStorage.getItem("token");
        UserService.setToken(token);
            if (!token ) {
            setMessage("Please log in to create new users.");
            setIsPositive(false);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
            }
        e.preventDefault();

        
        const newUser = {
            userName: newUserName,
            password: newPassword,
            email: newEmail,
            firstName: newFirstName,
            lastName: newLastName,
            role: newRole
        };

        
        UserService.create(newUser)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Käyttäjä lisätty onnistuneesti!");
                    setShowMessage(true);
                    setIsPositive(true);
                    setTimeout(() => setShowMessage(false), 5000);
                    setAddNew(false);
                }
            })
            .catch(error => {
                const backendMessage = error.response?.data || error.response?.message || "Tuntematon virhe";
                const axiosMessage = error.message;

                setMessage(error.response 
                    ? `backend Virhe: ${backendMessage}` 
                    : `axios Virhe: ${axiosMessage}`
                );
                setShowMessage(true);
                setIsPositive(false);
                setTimeout(() => setShowMessage(false), 10000);
            });
    };

    const match = newPassword === newPassword2;
    const showWarn = newPassword2.length > 0 && !match;

    return (
        <div id="AddForm">
            <h2>Lisää uusi käyttäjä</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        value={newUserName}
                        onChange={(e) => setNewUserName(e.target.value)}
                        placeholder="Käyttäjätunnus"
                        maxLength={40}
                        required
                    />
                </div>

                <div>
                    <input 
                        type="password" 
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        placeholder="Salasana"
                        maxLength={40}
                        required
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        value={newPassword2}
                        onChange={(e) => setPassword2(e.target.value)}
                        placeholder="Vahvista salasana"
                        maxLength={40}
                        required
                    />
                    {showWarn && (
                        <div style={{ color: "red", fontSize: "0.8rem", marginTop: "5px" }}>
                            Salasanat eivät täsmää!
                        </div>
                    )}
                </div>

                <div>
                    <input 
                        type="email" 
                        value={newEmail}
                        onChange={(e) => setNewEmail(e.target.value)}
                        placeholder="Sähköposti"
                        maxLength={60}
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        value={newFirstName}
                        onChange={(e) => setNewFirstName(e.target.value)}
                        placeholder="Etunimi"
                        maxLength={40}
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        value={newLastName}
                        onChange={(e) => setNewLastName(e.target.value)}
                        placeholder="Sukunimi"
                        maxLength={40}
                    />
                </div>

                <div>
                    <select 
                        value={newRole}
                        onChange={(e) => setNewRole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <button type="submit">Tallenna</button>
                <button type="button" onClick={() => setAddNew(false)}>Peruuta</button>
            </form>
        </div>
    );
}

export default AddUser;
