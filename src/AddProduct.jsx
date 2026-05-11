import "./App.css";
import React, {useState, useEffect} from "react";
import CustomerServices from "./services/Customer.js";

function ProductAdd({setAddNew, setIsPositive, setShowMessage, setMessage}) {

    const [newProductId, setNewProductId] = useState("");
    const [newProductName, setNewProductName] = useState("");
    const [newSupplierId, setNewSupplierId] = useState("");
    const [newCategoryId, setNewCategoryId] = useState("");
    const [newQuantityPU, setNewQuantityPU] = useState("");
    const [newPrice, setNewPrice] = useState("");
    const [newStock, setNewStock] = useState("");
    const [newOnOrder, setNewOnOrder] = useState("");
    const [newReLevel, setNewReLevel] = useState("");
    const [newDiscontinued, setNewDiscontinued] = useState("");
    const [newCategory, setNewCategory] = useState("");
    const [newSupplier, setNewSupplier] = useState("");

    const handelSubmit = (e) => {
        e.preventDefault();
        var newProduct = {
            //productId: newProductId,
            ProductName: newProductName,
            supplierId: newSupplierId,
            categoryId: newCategoryId,
            quantityPerUnit: newQuantityPU,
            unitPrice: newPrice,
            unitsInStock: newStock,
            unitsOnOrder: newOnOrder,
            reorderLevel: newReLevel,
            discontinued: newDiscontinued,
            category: newCategory,
            supplier: newSupplier 
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
            <div><input type="text" value={newProductName} onChange={({target}) => setNewProductName(target.value)} placeholder="Product Name" minLength={5} name="productName" required /></div>
            <div><input type="text" value={newSupplierId} onChange={({target}) => setNewSupplierId(target.value)} placeholder="Supplier ID" maxLength={40} name="supplierId" /></div>
            <div><input type="text" value={newCategoryId} onChange={({target}) => setNewCategoryId(target.value)} placeholder="Category ID" maxLength={30} name="categoryId" /></div>
            <div><input type="text" value={newQuantityPU} onChange={({target}) => setNewQuantityPU(target.value)} placeholder="Quantity per unit" maxLength={30} name="quantityPerUnit" /></div>
            <div><input type="text" value={newPrice} onChange={({target}) => setNewPrice(target.value)} placeholder="Price" maxLength={60} name="uniPrice" /></div>
            <div><input type="text" value={newStock} onChange={({target}) => setNewStock(target.value)} placeholder="Units in stock" maxLength={15} name="unitsInStock" /></div>
            <div><input type="text" value={newOnOrder} onChange={({target}) => setNewOnOrder(target.value)} placeholder="Units on order" maxLength={15} name="unitsOnOrder" /></div>
            <div><input type="text" value={newReLevel} onChange={({target}) => setNewReLevel(target.value)} placeholder="reorder level" name="reorderLevel" /></div>
            <div><input type="text" value={newDiscontinued} onChange={({target}) => setNewDiscontinued(target.value)} placeholder="Discontinued" maxLength={15} name="discontinued" /></div>
            <div><input type="text" value={newCategory} onChange={({target}) => setNewCategory(target.value)} placeholder="Category" maxLength={24} name="category" /></div>
            <div><input type="text" value={newSupplier} onChange={({target}) => setNewSupplier(target.value)} placeholder="Supplier" maxLength={24} name="supplier" /></div>

            <button type="submit">Save</button>
            <button type="button" onClick={() => setAddNew(false)}>Cancel</button>
        </form>
    </div>
  );
}

export default ProductAdd;