import "./App.css";
import React, {useState} from "react";
import ProductServices from "./services/Customer.js";

function Products({product, showD, setIsPositive, setShowMessage, setMessage}) {  

return (
  <div className="productDiv">
     <h4 onClick={()=> showD(product.productId)}
       >{product.productName}</h4>
     </div>
)
}

export default Products