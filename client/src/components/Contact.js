import React, { useEffect, useState } from "react";
import "../index.css";
function Contact({ contacts, currentUser , changeChat }) {
  useEffect(() => {
    if (currentUser) {
      setcurrentUsername(currentUser.username);
    }
  }, [currentUser]);
  const [currentUsername, setcurrentUsername] = useState(undefined);
  const [selected, setselected] = useState(undefined);

  const changeCurrentChat = (index , contact)=>{
    setselected(index);
    changeChat(contact);
  }
  return (
    <>
      {currentUsername && (
        <div
          className="container-liquid contact"
        >
          <div className="heading">
            <h3>Chatty</h3>
            <i
              class="fa-solid fa-comments fa-2xl pe-5"
              style={{ color: "#44885A" }}
            ></i>
          </div>
          <div className="contacts" style={{ marginTop: "40px" }}>
            {contacts.map((contact, index) => {
              return (
                <div
                  key={index}
                  className={`user-box ${index === selected ? "selected" : ""}`}
                  onClick={()=>{
                      changeCurrentChat(index , contact);
                  }}
                >
                  <div className="avatar">
                    <img
                      src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      alt="avatar"
                    />
                  </div>
                  <div className="user">
                    <h5>{contact.username}</h5>
                  </div>
                </div>
              );
            })}
            <div className="current-user">
              <div className="avatar">
                <img
                  src="https://bootdey.com/img/Content/avatar/avatar2.png"
                  alt="avatar"
                />
              </div>
              <div className="user">
                <h3 style={{paddingLeft : "10px" , paddingTop : "5px"}}>{currentUsername}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Contact;
