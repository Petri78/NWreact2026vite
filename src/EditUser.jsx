import "./App.css";
import React, { useState } from "react";
import UserService from "./services/Auth.js";

function EditUser({ 
    setEditUser, 
    setIsPositive, 
    setShowMessage, 
    setMessage, 
    currentUser, 
    setShowUsers 
}) {

    const [newUserName, setNewUserName] = useState(currentUser.userName);
    const [newEmail, setNewEmail] = useState(currentUser.email);
    const [newFirstName, setNewFirstName] = useState(currentUser.firstName);
    const [newLastName, setNewLastName] = useState(currentUser.lastName);
    const [newRole, setNewRole] = useState(currentUser.role);

    const handleSubmit = (e) => {
        const token = localStorage.getItem("token");
        UserService.setToken(token);
            if (!token ) {
            setMessage("Please log in to edit users.");
            setIsPositive(false);
            setShowMessage(true);
            setTimeout(() => setShowMessage(false), 5000);
            return;
            }
        e.preventDefault();

        const updatedUser = {
            userId: currentUser.userId,
            userName: newUserName,
            email: newEmail,
            firstName: newFirstName,
            lastName: newLastName,
            role: newRole
        };

        UserService.edit(updatedUser)
            .then(response => {
                if (response.status === 200 || response.status === 201) {
                    setMessage("Käyttäjä päivitetty onnistuneesti!");
                    setShowMessage(true);
                    setIsPositive(true);

                    setTimeout(() => setShowMessage(false), 5000);

                    setEditUser(false);
                    setShowUsers(true);
                }
            })
            .catch(error => {
                const backendMessage = error.response?.data;
                const axiosMessage = error.message;

                setMessage(error.response 
                    ? `Virhe: ${backendMessage}` 
                    : `Virhe: ${axiosMessage}`
                );

                setShowMessage(true);
                setIsPositive(false);
                setTimeout(() => setShowMessage(false), 10000);
            });
    };

    const back = () => {
        setEditUser(false);
        setShowUsers(true);
    };

    return (
        <div id="AddForm">
            <h2>Muokkaa käyttäjän tietoja</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <input 
                        type="text" 
                        value={newUserName || ""} 
                        onChange={(e) => setNewUserName(e.target.value)} 
                        placeholder="Käyttäjätunnus" 
                        maxLength={40} 
                        required 
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        value={newFirstName || ""} 
                        onChange={(e) => setNewFirstName(e.target.value)} 
                        placeholder="Etunimi" 
                        maxLength={40} 
                    />
                </div>

                <div>
                    <input 
                        type="text" 
                        value={newLastName || ""} 
                        onChange={(e) => setNewLastName(e.target.value)} 
                        placeholder="Sukunimi" 
                        maxLength={40} 
                    />
                </div>

                <div>
                    <input 
                        type="email" 
                        value={newEmail || ""} 
                        onChange={(e) => setNewEmail(e.target.value)} 
                        placeholder="Sähköposti" 
                        maxLength={60} 
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

                <button type="submit">Päivitä käyttäjä</button>
                <button type="button" onClick={back}>Peruuta</button>
            </form>
        </div>
    );
}

export default EditUser;
