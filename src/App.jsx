import { useState } from "react";
import "./App.css";
import Message from "./Message";
import CustomerList from "./CustomerList";
import UsersList from "./UsersList";
import ProductsList from "./ProductsList"
import Login from "./Login";
import ChangePwd from "./ChangePwd";

import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  const [message, setMessage] = useState("");
  const [isPositive, setIsPositive] = useState(true);
  const [showMessage, setShowMessage] = useState(false);

  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem("token"));
  const role = localStorage.getItem("role");

  return (
    <div className="App">
      <Router>

        {loggedIn && (
          <Navbar bg="light" expand="lg" className="fixed-top">
            <Navbar.Brand href="/">NW React 2026</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link href="/">Home</Nav.Link>

                {role === "admin" && <Nav.Link href="/Users">Users</Nav.Link>}

                <Nav.Link href="/Customers">Customers</Nav.Link>
                <Nav.Link href="/Products">Products</Nav.Link>
                {(role === "user" || role === "admin") && <Nav.Link href="/ChangePwd">Vaihda salasana</Nav.Link>}
                <Nav.Link onClick={() => {
                  localStorage.clear();
                  setLoggedIn(false);
                }} style={{ cursor: "pointer" }}>
                  Logout
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        )}

        {showMessage && (
          <Message message={message} isPositive={isPositive} />
        )}

        <Routes>

          {!loggedIn && (
            <Route
              path="*"
              element={<Login setLoggedIn={setLoggedIn} setIsPositive={setIsPositive} setMessage={setMessage} setShowMessage={setShowMessage}/>}
            />
          )}

          {loggedIn && role === "admin" && (
            <Route
              path="/Users"
              element={
                <UsersList
                  setIsPositive={setIsPositive}
                  setShowMessage={setShowMessage}
                  setMessage={setMessage}
                  setLoggedIn={setLoggedIn}
                />
              }
            />
          )}

          {loggedIn && (role === "user" || role === "admin") && (
            <Route
              path="/ChangePwd"
              element={<ChangePwd 
                setLoggedIn={setLoggedIn}
                setIsPositive={setIsPositive} 
                setShowMessage={setShowMessage} 
                setMessage={setMessage} />}
            />
          )}

          {loggedIn && (
            <Route
              path="/Customers"
              element={
                <CustomerList
                  setIsPositive={setIsPositive}
                  setShowMessage={setShowMessage}
                  setMessage={setMessage}
                />
              }
            />
          )}

          {loggedIn &&(
            <Route
            path="/Products"
            element={
              <ProductsList
                setIsPositive={setIsPositive}
                setShowMessage={setShowMessage}
                setMessage={setMessage}
                />
            }
            />
          )}

          {loggedIn && (
            <Route
              path="/"
              element={<h2 style={{ marginTop: "80px" }}>Tervetuloa!</h2>}
            />
          )}
        </Routes>
      </Router>
    </div>
  );
}

export default App;