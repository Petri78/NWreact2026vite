import "./App.css";

function Message({message, isPositive}) {
    let style = '';
    if (isPositive === true){
        style = "pos"
    }
    else {
        style = "neg"
    }
  return (
    // Käytetään id:tä ja app.css määritetään viestilaatikon sijainti kiinteäksi, joten ohjelmallinen scrollaaminen ei ole tarpeen.
    <div id="messageBox" className={`tyyli ${style}`}> 
      <h2>{message}</h2>
    </div>
  )
}

export default Message;