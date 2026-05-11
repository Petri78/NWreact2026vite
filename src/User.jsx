import "./App.css";
import React, {useState} from "react";
import userServices from "./services/Auth"

function User({user, showU, setIsPositive, setShowMessage, setMessage}) {  

return (
  <div className="userDiv">
     <h4 onClick={()=> showU(user.userId)}
       >{user.userName}</h4>
     </div>
)
}

export default User