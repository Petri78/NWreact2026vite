import "./App.css";
import React, {useState, useEffect} from "react";
import ProductsServices from "./services/Products.js";
import Products from "./Products.jsx";
import ProductAdd from "./AddProduct.jsx";
import ProductEdit from "./EditProduct.jsx";

function ProductsList({setIsPositive, setShowMessage, setMessage}) {
    const [products, setProducts] = useState([]);
    const [showProducts, setShowProducts] = useState(false);
    const [addNew, setAddNew] = useState(false);
    const [editProduct, setEditProduct] = useState(false);
    const [currentProduct, setCurrentProduct] = useState(null);

    const [showDetails, setShowDetails] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const [search, setSearch] = useState("");



    useEffect(() => {
      const token = localStorage.getItem("token");
      ProductsServices.setToken(token);
      if (!token ) {
        setMessage("Please log in to view products.");
        setIsPositive(false);
        setShowMessage(true);
        setTimeout(() => setShowMessage(false), 5000);
        return;
      }
      ProductsServices.getProducts()
        .then(data => {
          console.log("Data saapunut:", data);
          setProducts(data);
        })
        .catch(err => console.error(err));
    }, [addNew, editProduct]); 

    const editC = (product) => {
      setCurrentProduct(product);
      setEditProduct(true);
      setShowDetails(false);
      setShowProducts(false);
    }
    const showD = (productId) => {
      const product = products.find(p => p.productId === productId);
      setSelectedProduct(product);
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
      setShowProducts(false);
    }

    const back = () => {
      setShowDetails(false);
      setShowProducts(true);
    }

    const handleSearch = (e) => {
      setShowProducts(true);
      setSearch(e.target.value);
    };


    function deleteProduct(product) {
      if(window.confirm(`Are you sure you want to delete ${product.productName}?`)){
        ProductsServices.deleteProduct(product.productName)
        .then(Response =>{
            if(Response.status === 204 || Response.status === 200){
                setMessage(Response.data);
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
                );
                setShowMessage(true);
                setIsPositive(true);
                setTimeout(() => {setShowMessage(false);}, 5000);
        })
    }
}

//  Siirretty details tänne, saa piilotettua näkymän kun avaa edit-näkymän, eikä aukea useampia detail-näkymiä
 return (
  <>
  <div className="toolbar">
    <button onClick={()=> setShowProducts(!showProducts)}>Show products</button>
    <button onClick={()=> AddNew()}>Add New Customer</button>
    <input type="text" placeholder="Search by product name" value={search} onChange={handleSearch} />
    </div>
    <div className="productContent">
      {showDetails && !editProduct && (
        <div className="productDetails">
          <table>
            <thead>
              <tr>
                <th>Product name:</th>
                <th>Units in stock:</th>
                <th>Price:</th>
                <th>discontinued:</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{selectedProduct.productName}</td>
                <td>{selectedProduct.unitsInStock}</td>
                <td>{selectedProduct.unitPrice}</td>
                <td>{selectedProduct.discontinued}</td>
              </tr>
            </tbody>
          </table>
          <button onClick={() => deleteProduct(selectedProduct)}>Delete</button>
          <button onClick={() => editC(selectedProduct)}>Edit</button>
          <button onClick={() => back()}>Close</button>
        </div>
      )}

    {addNew && <ProductAdd setAddNew={setAddNew} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage}/>}
    {editProduct && <ProductEdit currentProduct={currentProduct} setEditProduct={setEditProduct} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} setShowProducts={setShowProducts}/>}
    </div>
    <div className="productList">
    {showProducts && products && products.map(p => {
        const searchTerm = p.productName.toLowerCase();
        if (searchTerm.indexOf(search) > -1) {
          return (
        <Products key={p.productId} product={p} setIsPositive={setIsPositive} setShowMessage={setShowMessage} setMessage={setMessage} editC={editC} showD={showD}/>
        )
        }
    }
  )
    }
    </div>
  </>
  );
}

export default ProductsList; 