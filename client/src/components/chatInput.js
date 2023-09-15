import React , {useState} from 'react'

function ChatInput({handleSendMsg}) {

  const [msg, setmsg] = useState("");
  const sendChat =(event)=>{
    event.preventDefault();
    if(msg.length > 0 ){
      handleSendMsg(msg);
      setmsg("");
    }
  }
  return (
    <>
    <div className="input">
    <form action="" onSubmit={(e)=>sendChat(e)} style={{display : "flex" , alignItems : "center" }}>
    <i class='bx bx-dots-horizontal-rounded bx-sm' style={{color : "white" , padding : "0 , 1em" , paddingBottom : "0.9em"}}></i>
    <i class='bx bx-smile bx-sm' style={{color : "white" , padding : "0 , 1em" , paddingBottom : "0.9em"}}></i>
    <input type="text" placeholder='Type your message...' value={msg} onChange={(e)=>setmsg(e.target.value)}/>
    <i class='bx bx-microphone bx-sm' style={{color : "white" , padding : "0 , 1em" , paddingBottom : "0.9em"}}></i>
    <button type="submit" class="btn" style={{width: "3em"  ,height: "2.2em" , marginBottom : "1em" , backgroundColor : "#427F57"}}><i class='bx bxs-send' style={{}} ></i></button>
    </form>
    </div>
    </>
  )
}

export default ChatInput