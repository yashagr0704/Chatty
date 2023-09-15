import React , { useEffect , useState , useRef } from 'react'
import Contact from '../components/Contact'
import {useNavigate} from "react-router-dom";
import {allUsersRoute , host} from "../utils/APIRoutes"
import axios from "axios"
import "../index.css"
import {io} from "socket.io-client";
import Welcome from '../components/Welcome';
import ChatContainer from '../components/ChatContainer';
function Chat() {
  const socket = useRef();
  const navigate = useNavigate();
  const [contacts, setcontacts] = useState([]);
  const [currentUser , setcurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);
  // eslint-disable-next-line
  useEffect(() => {
    async function func2(){
      if (!localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)) {
        navigate("/login");
      } else {
        setcurrentUser(
          await JSON.parse(
            localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
          )
        );
      }
    }
    func2();
    // eslint-disable-next-line
  }, []);
// eslint-disable-next-line
  useEffect(() => {
    async function func1(){
      if (currentUser) {
        const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
        setcontacts(data.data);
      }
    }
    func1();
    // eslint-disable-next-line
  }, [currentUser]);
  
  const handleChatChange = (chat)=>{
      setCurrentChat(chat);
  }
  useEffect(() => {
    if(currentUser){
        socket.current = io(host);
        socket.current.emit("add-user" , currentUser._id);
    }
  }, [currentUser])
  
  return (
    <>
    <div className="container-liquid" style={{background: "linear-gradient(to top, #fbc2eb 0%, #a18cd1 100%)",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          paddingLeft : "0%",
          }}>
      <div className="container-liquid chat-box" style={{background : "#2E2E2E"}}>
        <Contact contacts={contacts} currentUser={currentUser} changeChat = {handleChatChange}/>
        {currentChat === undefined ? <Welcome currentChat={currentChat}/> : <ChatContainer currentChat={currentChat} currentUser={currentUser} socket={socket}/>}
      </div>
    </div>
    </>
  )
}

export default Chat