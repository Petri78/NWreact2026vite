    import "./App.css";
    import React, { useState, useEffect } from "react";
    import UserService from "./services/Auth.js";
    import EditUser from "./EditUser.jsx";
    import AddUser from "./AddUser.jsx";
    import User from "./User.jsx";

    function UsersList({setIsPositive, setShowMessage, setMessage, setLoggedIn}) {

        const [users, setUsers] = useState([]);
        const [showUsers, setShowUsers] = useState(true);
        const [addNew, setAddNew] = useState(false);
        const [editUser, setEditUser] = useState(false);
        const [currentUser, setCurrentUser] = useState(null);
        const [search, setSearch] = useState("");
        const [selectedUser, setSelectedUser] = useState(null)
        const [showUDetails, setShowUDetails] = useState(false);
        
        const role = localStorage.getItem("role");
        if (role !== "admin") {
            return <h2>Pääsy estetty, vain Admin voi tarkastella käyttäjiä.</h2>;
        }

        useEffect(() => {
            const token = localStorage.getItem("token");
            UserService.setToken(token);
            if (!token ) {
                setLoggedIn(false);
                setMessage("Please log in to view users.");
                setIsPositive(false);
                setShowMessage(true);
                setTimeout(() => setShowMessage(false), 5000);
                return;
            }

            UserService.getUsers()
                .then(data => {
                    setUsers(data);
                    setShowUsers(true);
                })
                .catch(error => {
                        const backendMessage = error.response?.data || error.response?.message || "Tuntematon virhe";
                        const axiosMessage = error.message;

                        setMessage(error.response 
                            ? `backend Virhe: ${backendMessage}` 
                            : `axios Virhe: ${axiosMessage}`
                        );                setShowMessage(true);
                        setIsPositive(true);
                        setTimeout(() => {setShowMessage(false);}, 5000);
                })        
            }, [addNew, editUser, setLoggedIn]);

        const logout = () => {
            localStorage.clear();
            setLoggedIn(false);
        };

        const deleteUser = (user) => {
            const token = localStorage.getItem("token");
            if (!token) {
                setLoggedIn(false);
                return;
            }
            if (window.confirm(`Poistetaanko käyttäjä ${user.userName}?`)) {
                UserService.remove(user.userId)
                    .then(() => {
                        setMessage("Käyttäjä poistettu");
                        setIsPositive(true);
                        setShowMessage(true);
                        UserService.getUsers().then(data => setUsers(data));
                        setShowUDetails(false);
                        setShowUsers(true);
                        setTimeout(() => setShowMessage(false), 3000);
                    })
                    .catch(error => {
                            const backendMessage = error.response?.data || error.response?.message || "Tuntematon virhe";
                            const axiosMessage = error.message;

                            setMessage(error.response 
                                ? `backend Virhe: ${backendMessage}` 
                                : `axios Virhe: ${axiosMessage}`
                            );                setShowMessage(true);
                            setIsPositive(true);
                            setTimeout(() => {setShowMessage(false);}, 5000);
                    })            
        }
        };

        const editU = (user) => {
            setCurrentUser(user);
            setEditUser(true);
            setShowUsers(false);
            setAddNew(false);
        };

        const showU = (userId) => {
            const user = users.find(u => u.userId === userId);
            setSelectedUser(user);
            setShowUDetails(true);
            //setShowUsers(false);
        }

        const back = () => { 
            setShowUDetails(false);
            setShowUsers(true);
        }

        return (
            <>
                <div className="toolbar">
                    <button onClick={logout}>Kirjaudu ulos</button>
                    <button onClick={() => { setAddNew(true); setEditUser(false); setShowUsers(false); }}>Lisää uusi käyttäjä</button>
                    <input type="text" placeholder="Hae käyttäjänimellä" value={search} onChange={(e) => { setSearch(e.target.value); setShowUsers(true); }}/>
                </div>
                <div className="userContent">
                    {showUDetails && !editUser && (
                    <div className="userDetails">
                    <table>
                        <thead>
                        <tr>
                            <th>Username:</th>
                            <th>Email:</th>
                            <th>Role:</th>
                            <th>UserId:</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>{selectedUser.userName}</td>
                            <td>{selectedUser.role}</td>
                            <td>{selectedUser.email}</td>
                            <td>{selectedUser.userId}</td>
                        </tr>
                        </tbody>
                    </table>
                    <button onClick={() => deleteUser(selectedUser)}>Delete</button>
                    <button onClick={() => editU(selectedUser)}>Edit</button>
                    <button onClick={() => back()}>Close</button>
                    </div>
                    )}
                {addNew && (<AddUser setAddNew={setAddNew} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} setShowUsers={setShowUsers}/>)}
                {editUser && (<EditUser currentUser={currentUser} setEditUser={setEditUser} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} setShowUsers={setShowUsers}/>)}
                </div>
                {showUsers && (
                    <div className="userList">
                        <h2>Käyttäjät</h2>
                            {showUsers && users && users.map(u => {
                            const searchTerm = u.userName.toLowerCase();
                            if (searchTerm.indexOf(search) > -1) {
                            return (
                            <User key={u.userId} user={u} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} editU={editU} showU={showU}/>
                            )
                            }})}
                    </div>
                )}
            </>
        );
    }

    export default UsersList;