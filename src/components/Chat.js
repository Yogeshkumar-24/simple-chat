import React, { useEffect, useState } from "react";
import ScrollToBottom from 'react-scroll-to-bottom'
import { faHome, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList,setMessageList] = useState([])

  const sendMessage = async() => {
    if (message !== "") {
      const messageData = {
        room: room,
        author: username,
        message: message,
        time:
          new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      };
      setMessageList((list) => [...list,messageData])
      await socket.emit("send_message",messageData)
      setMessage("")
    }
  };

  useEffect(()=> {
    socket.on("receive_message", (data)=> {
      setMessageList((list) => [...list ,data])
    })
  },[socket])


  return (
    <div className="messageContainer">
      <div className="header">Simple Chat</div>
      <div className="message">
        <ScrollToBottom className="scroll">
        {
        messageList.map((messageContent) => {
         return <div className="messageBox">
         <div className="messageSubBox" id={username === messageContent.author ? 'self' : 'receive'}>
         <div  className="messageContent" id={username === messageContent.author ? 'green' : 'blue'}><p>{messageContent.message}</p></div>
          <div className="info">
            <p className="time">{messageContent.time}</p>
            <p className="author">{username === messageContent.author ? 'You' : messageContent.author}</p>
          </div>
         </div>
         </div>
        })
      }
      </ScrollToBottom>
      </div>
      <div className="footer">
        <input
          type="text"
          placeholder="Enter Message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(event) => event.key === 'Enter' && sendMessage()}
        />
        <button onClick={sendMessage}>
        <FontAwesomeIcon  id='icon' icon={faPaperPlane} />
 {/* <FontAwesomeIcon icon="fa-solid fa-check-square" />         */}
 </button>
      </div>
    </div>
  );
};

export default Chat;
