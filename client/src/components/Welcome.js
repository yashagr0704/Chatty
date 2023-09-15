import React from 'react'

function Welcome() {
  return (
    <>
        <div className="container-liquid welcome" style={{backgroundColor : "#2e2e2e" , color : "white"}}>
        <div className="icon">
        <i class='bx bxs-message-dots bx-lg bx-border-circle' style={{color: "#4EAC6D"}} ></i>
        </div>
        <h1 style={{opacity : "80%" , paddingTop : "10px"}}>Welcome to the Chatty App</h1>
        <h5 style={{opacity : "50%" , paddingTop : "10px"}}>Please select a chat to get started.</h5>
        </div>
    </>
  )
}

export default Welcome