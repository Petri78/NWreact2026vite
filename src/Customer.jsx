import "./App.css";
import React, {useState} from "react";
import CustomerServices from "./services/Customer.js";

function Customer({customer, showD, setIsPositive, setShowMessage, setMessage}) {  

return (
  <div className="customerDiv">
     <h4 onClick={()=> showD(customer.customerId)}
       >{customer.companyName}</h4>
     </div>
)
}

export default Customer