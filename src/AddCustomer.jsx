import "./App.css";
import React, {useState, useEffect} from "react";
import CustomerServices from "./services/Customer.js";

function CustomerAdd({setAddNew, setIsPositive, setShowMessage, setMessage}) {

    const [newCustomerId, setNewCustomerId] = useState("");
    const [newCompanyName, setNewCompanyName] = useState("");
    const [newContactName, setNewContactName] = useState("");
    const [newContactTitle, setNewContactTitle] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newCity, setNewCity] = useState("");
    const [newRegion, setNewRegion] = useState("");
    const [newPostalCode, setNewPostalCode] = useState("");
    const [newCountry, setNewCountry] = useState("");
    const [newPhone, setNewPhone] = useState("");
    const [newFax, setNewFax] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        var newCustomer = {
            customerId: newCustomerId.toUpperCase(),
            companyName: newCompanyName,
            contactName: newContactName,
            contactTitle: newContactTitle,
            address: newAddress,
            city: newCity,
            region: newRegion,
            postalCode: newPostalCode,
            country: newCountry,
            phone: newPhone,
            fax: newFax
        };
        
        CustomerServices.create(newCustomer)
        .then(Response =>{
            if(Response.status === 201 || Response.status === 200){
                setMessage("Customer added successfully!");
                setShowMessage(true);
                setIsPositive(true);
                setTimeout(() => {setShowMessage(false);}, 5000);
                setAddNew(false);
            }
        })
        .catch(error => {
            //Näytetään joko backendin tai jos se ei ole saatavilla niin axiosin virheilmoitus.
            const backendMessage = error.response?.data;
            const axiosMessage = error.message;
            setMessage(error.response ? `Error: ${backendMessage}` : `Error: ${axiosMessage}`);
            setShowMessage(true);
            setIsPositive(false);
            setTimeout(() => setShowMessage(false), 10000);
        })
    }

 return (
    <div id="AddForm">
        <h2>Lisää uusi asiakas</h2>
        <form onSubmit={handelSubmit}>
            <div><input type="text" value={newCustomerId} onChange={({target}) => setNewCustomerId(target.value)} placeholder="Customer ID with 5 capital letters" minLength={5} maxLength={5} name="customerId" required /></div>
            <div><input type="text" value={newCompanyName} onChange={({target}) => setNewCompanyName(target.value)} placeholder="Company Name" maxLength={40} name="companyName" required /></div>
            <div><input type="text" value={newContactName} onChange={({target}) => setNewContactName(target.value)} placeholder="Contact Name" maxLength={30} name="contactName" /></div>
            <div><input type="text" value={newContactTitle} onChange={({target}) => setNewContactTitle(target.value)} placeholder="Contact Title" maxLength={30} name="contactTitle" /></div>
            <div><input type="text" value={newAddress} onChange={({target}) => setNewAddress(target.value)} placeholder="Address" maxLength={60} name="address" /></div>
            <div><input type="text" value={newCity} onChange={({target}) => setNewCity(target.value)} placeholder="City" maxLength={15} name="city" /></div>
            <div><input type="text" value={newRegion} onChange={({target}) => setNewRegion(target.value)} placeholder="Region" maxLength={15} name="region" /></div>
            <div><input type="text" value={newPostalCode} onChange={({target}) => setNewPostalCode(target.value)} placeholder="Postal Code" name="postalCode" /></div>
            <div><input type="text" value={newCountry} onChange={({target}) => setNewCountry(target.value)} placeholder="Country" maxLength={15} name="country" /></div>
            <div><input type="text" value={newPhone} onChange={({target}) => setNewPhone(target.value)} placeholder="Phone" maxLength={24} name="phone" /></div>
            <div><input type="text" value={newFax} onChange={({target}) => setNewFax(target.value)} placeholder="Fax" maxLength={24} name="fax" /></div>

            <button type="submit">Save</button>
            <button type="button" onClick={() => setAddNew(false)}>Cancel</button>
        </form>
    </div>
  );
}

export default CustomerAdd;