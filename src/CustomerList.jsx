import "./App.css";
import React, {useState, useEffect} from "react";
import CustomerServices from "./services/Customer.js";
import Customer from "./Customer.jsx";
import CustomerAdd from "./AddCustomer.jsx";
import CustomerEdit from "./EditCustomer.jsx";

function CustomerList({setIsPositive, setShowMessage, setMessage}) {
    const [customers, setCustomers] = useState([]);
    const [showCustomers, setShowCustomers] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [editCustomer, setEditCustomer] = useState(false);
    const [currentCustomer, setCurrentCustomer] = useState(null);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const [search, setSearch] = useState("");



    useEffect(() => {
      const token = localStorage.getItem("token");
      CustomerServices.setToken(token);
      if (!token ) {
        setMessage("Please log in to view customers.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
        return;
      }
      CustomerServices.getCustomers()
        .then(data => {
          console.log("Data saapunut:", data);
          setCustomers(data);
        })
        .catch(err => console.error(err));
    }, [addNew, editCustomer]); 

    const editC = (customer) => {
      setCurrentCustomer(customer);
      setEditCustomer(true);
      setShowDetails(false);
      setShowCustomers(false);
    }
    const showD = (customerId) => {
      const customer = customers.find(c => c.customerId === customerId);
      setSelectedCustomer(customer);
      setShowDetails(true);
    }

    const AddNew = () => {
        const token = localStorage.getItem("token");
        CustomerServices.setToken(token);
      if (!token ) {
        setMessage("Please log in to add customers.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
        return;
      }
      setAddNew(true);
      setShowCustomers(false);
    }

    const back = () => {
      setShowDetails(false);
      setShowCustomers(true);
    }

    const handleSearch = (e) => {
      setShowCustomers(true);
      setSearch(e.target.value);
    };


    function deleteCustomer(customer) {
      if(window.confirm(`Are you sure you want to delete ${customer.companyName}?`)){
        CustomerServices.remove(customer.customerId)
        .then(Response =>{
            if(Response.status === 204 || Response.status === 200){
                setMessage(Response.data); //Tämä viesti tulee suoraan ja vain backendistä. 
                setShowMessage(true);
                setIsPositive(true);
                setTimeout(() => {setShowMessage(false); 
                    setTimeout(() => {window.location.reload();}, 500);
                }, 3000);
            }
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
    }

//  Siirretty details tänne, saa piilotettua näkymän kun avaa edit-näkymän, eikä aukea useampia detail-näkymiä
 return (
  <>
  <div className="toolbar">
    <button onClick={()=> setShowCustomers(!showCustomers)}>Show customers</button>
    <button onClick={()=> AddNew()}>Add New Customer</button>
    <input type="text" placeholder="Search by company name" value={search} onChange={handleSearch} />
    </div>
    <div className="customerContent">
      {showDetails && !editCustomer && (
        <div className="customerDetails">
          <table>
            <thead>
              <tr>
                <th>City:</th>
                <th>Phone:</th>
                <th>Contact:</th>
                <th>Country:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedCustomer.city}</td>
                <td>{selectedCustomer.phone}</td>
                <td>{selectedCustomer.contactName}</td>
                <td>{selectedCustomer.country}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => deleteCustomer(selectedCustomer)}>Delete</button>
          <button onClick={() => editC(selectedCustomer)}>Edit</button>
          <button onClick={() => back()}>Close</button>
        </div>
      )}

    {addNew && <CustomerAdd setAddNew={setAddNew} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage}/>}
    {editCustomer && <CustomerEdit currentCustomer={currentCustomer} setEditCustomer={setEditCustomer} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} setShowCustomers={setShowCustomers}/>}
    </div>
    <div className="customerList">
    {showCustomers && customers && customers.map(c => {
        const searchTerm = c.companyName.toLowerCase();
        if (searchTerm.indexOf(search) > -1) {
          return (
        <Customer key={c.customerId} customer={c} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} editC={editC} showD={showD}/>
        )
        }
    }
  )
    }
    </div>
  </>
  );
}

export default CustomerList; 