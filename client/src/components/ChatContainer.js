import React , {useState,useEffect} from 'react'
import ChatInput from './chatInput';
import axios from 'axios';
import {addMsgRoute ,getAllMsg} from '../utils/APIRoutes'
function ChatContainer({currentChat , currentUser , socket}) {
  const [messages, setmessages] = useState([]);
  const [ArrivalMsg, setArrivalMsg] = useState(null);
  const handleSendMsg = async(msg)=>{
    socket.current.emit("send-msg" , {
      to: currentChat._id,
      from: currentUser._id,
      message:msg
    });
    await axios.post(addMsgRoute , {
      from:currentUser._id,
      to:currentChat._id,
      message:msg,
    });
    const msgs = [...messages];
    msgs.push({fromSelf:true , message:msg});
    setmessages(msgs);
  };
  useEffect(() => {
    if(socket.current){
      socket.current.on("msg-receive" , (msg)=>{
        setArrivalMsg({fromSelf:false , message:msg});
      })
    }
  },)
  useEffect(() => {
    ArrivalMsg && setmessages((prev) => [...prev, ArrivalMsg]);
  }, [ArrivalMsg])
  
  useEffect(() => {
    async function func(){
      const data = await axios.post(getAllMsg , {
        from:currentUser._id,
        to:currentChat._id,
      });
      setmessages(data.data);
    }
    func();
    // eslint-disable-next-line 
  }, [currentChat])
  
  return (
    <>
    <div className="container-liquid chat-container">
        <div className="user-nav">
            <div className='usr'>
              <img src="https://doot-dark.react.themesbrand.com/static/media/avatar-3.bd68c38c.jpg" alt="" />
              <h4 style={{paddingTop : "0.2em" , paddingLeft : "0.6em" , textTransform: "capitalize" , color : "#e9e9e9" }}>{currentChat.username}</h4>
            </div>
            <div className="icons">
            <i class='bx bx-search-alt-2 bx-sm'></i>
            <i class='bx bxs-phone-call bx-sm' ></i>
            <i class='bx bx-video bx-sm'></i>
            <i class='bx bxs-info-circle bx-sm' ></i>
            <i class='bx bx-dots-vertical-rounded bx-sm' ></i>
            </div>
        </div>
        <div className="chats" style={{overflow : "auto"}}>
        <div className="chat-messages">
          {messages.map((msg)=>{
            return(
              <div className= {`message ${msg.fromSelf ? "sender" : "receiver"}`}>
              <p style={{paddingTop : "0.5em"}}>{msg.message}</p>
            </div>
            )
          })}
        </div>
        <div style={{position : "fixed" , bottom : "0%" , background : "#2E2E2E" , width: "100%"}}>
          <ChatInput handleSendMsg={handleSendMsg}/>
        </div>
        </div>
    </div>
    </>
  )
}

export default ChatContainer